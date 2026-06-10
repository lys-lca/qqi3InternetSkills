/**
 * wordsearch-engine.js
 * ------------------------------------------------------------------
 * Pure wordsearch generation helpers.
 *
 * The engine:
 * - chooses unique searchable glossary terms;
 * - places words using the directions allowed by the selected mode;
 * - fills unused cells with random letters;
 * - rejects grids where a target word accidentally appears twice.
 * ------------------------------------------------------------------
 */

const WORDSEARCH_ENGINE = (() => {
  const MIN_WORD_LENGTH = 3;
  const MAX_WORD_LENGTH = 15;
  const FILL_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const SIMPLE_DIRECTIONS = [
    [0, 1],
    [1, 0]
  ];

  const ALL_DIRECTIONS = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [-1, 1]
  ];

  function shuffleItems(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const other = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[other]] = [copy[other], copy[index]];
    }
    return copy;
  }

  function normaliseWord(value) {
    return String(value || "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");
  }

  function wordForEntry(entry) {
    const term = normaliseWord(entry.term);
    const abbreviation = normaliseWord(entry.abbr);

    if (term.length >= MIN_WORD_LENGTH && term.length <= MAX_WORD_LENGTH) {
      return term;
    }

    if (abbreviation.length >= MIN_WORD_LENGTH && abbreviation.length <= MAX_WORD_LENGTH) {
      return abbreviation;
    }

    return null;
  }

  function eligibleEntries(entries, category = "all") {
    const uniqueWords = new Map();

    entries.forEach(entry => {
      if (entry.searchable === false) return;
      if (category !== "all" && !entry.tags.includes(category)) return;

      const word = wordForEntry(entry);
      if (!word || uniqueWords.has(word)) return;

      uniqueWords.set(word, {
        entry,
        word,
        id: `${normaliseWord(entry.term)}-${word}`
      });
    });

    return [...uniqueWords.values()];
  }

  function emptyGrid(size) {
    return Array.from({ length: size }, () => Array(size).fill(""));
  }

  function canPlace(grid, word, row, column, rowStep, columnStep) {
    for (let index = 0; index < word.length; index += 1) {
      const currentRow = row + (rowStep * index);
      const currentColumn = column + (columnStep * index);

      if (
        currentRow < 0 ||
        currentRow >= grid.length ||
        currentColumn < 0 ||
        currentColumn >= grid.length
      ) {
        return false;
      }

      const currentLetter = grid[currentRow][currentColumn];
      if (currentLetter && currentLetter !== word[index]) {
        return false;
      }
    }

    return true;
  }

  function placeWord(grid, candidate, directions) {
    const attempts = Math.max(250, grid.length * grid.length * directions.length);

    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const [rowStep, columnStep] = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * grid.length);
      const column = Math.floor(Math.random() * grid.length);

      if (!canPlace(grid, candidate.word, row, column, rowStep, columnStep)) {
        continue;
      }

      const cells = [];
      for (let index = 0; index < candidate.word.length; index += 1) {
        const currentRow = row + (rowStep * index);
        const currentColumn = column + (columnStep * index);
        grid[currentRow][currentColumn] = candidate.word[index];
        cells.push({ row: currentRow, column: currentColumn });
      }

      return {
        ...candidate,
        row,
        column,
        rowStep,
        columnStep,
        cells
      };
    }

    return null;
  }

  function fillGrid(grid) {
    return grid.map(row => row.map(letter =>
      letter || FILL_LETTERS[Math.floor(Math.random() * FILL_LETTERS.length)]
    ));
  }

  function wordMatches(grid, word, row, column, rowStep, columnStep) {
    for (let index = 0; index < word.length; index += 1) {
      const currentRow = row + (rowStep * index);
      const currentColumn = column + (columnStep * index);

      if (
        currentRow < 0 ||
        currentRow >= grid.length ||
        currentColumn < 0 ||
        currentColumn >= grid.length ||
        grid[currentRow][currentColumn] !== word[index]
      ) {
        return false;
      }
    }

    return true;
  }

  function occurrenceCount(grid, word) {
    const paths = new Set();

    for (let row = 0; row < grid.length; row += 1) {
      for (let column = 0; column < grid.length; column += 1) {
        for (const [rowStep, columnStep] of ALL_DIRECTIONS) {
          if (!wordMatches(grid, word, row, column, rowStep, columnStep)) continue;

          const endRow = row + (rowStep * (word.length - 1));
          const endColumn = column + (columnStep * (word.length - 1));
          const endpoints = [`${row},${column}`, `${endRow},${endColumn}`].sort();
          paths.add(endpoints.join("|"));
        }
      }
    }

    return paths.size;
  }

  function hasOneOccurrencePerTarget(grid, placements) {
    return placements.every(placement => occurrenceCount(grid, placement.word) === 1);
  }

  function baseGridSize(candidates) {
    const longest = Math.max(...candidates.map(candidate => candidate.word.length));
    const totalLetters = candidates.reduce((total, candidate) => total + candidate.word.length, 0);
    const spaceForWords = Math.ceil(Math.sqrt(totalLetters * 2.4));
    return Math.max(12, Math.min(18, Math.max(longest + 2, spaceForWords)));
  }

  function createPuzzle(entries, options = {}) {
    const mode = options.mode || "simple";
    const requestedCount = Math.max(1, Math.min(10, Number(options.count) || 10));
    const category = options.category || "all";
    const directions = mode === "simple" ? SIMPLE_DIRECTIONS : ALL_DIRECTIONS;
    const pool = eligibleEntries(entries, category);

    if (!pool.length) return null;

    const selectedCount = Math.min(requestedCount, pool.length);

    // Some combinations contain short words that can occur inside longer
    // terms. If a clean grid cannot be made, choose a fresh random set.
    for (let selectionAttempt = 0; selectionAttempt < 6; selectionAttempt += 1) {
      const selected = shuffleItems(pool).slice(0, selectedCount);
      const sorted = [...selected].sort((first, second) => second.word.length - first.word.length);
      const initialSize = baseGridSize(sorted);

      for (let size = initialSize; size <= 18; size += 1) {
        for (let layoutAttempt = 0; layoutAttempt < 45; layoutAttempt += 1) {
          const grid = emptyGrid(size);
          const placements = [];
          let layoutFailed = false;

          for (const candidate of sorted) {
            const placement = placeWord(grid, candidate, directions);
            if (!placement) {
              layoutFailed = true;
              break;
            }
            placements.push(placement);
          }

          if (layoutFailed) continue;

          for (let fillAttempt = 0; fillAttempt < 180; fillAttempt += 1) {
            const filled = fillGrid(grid);
            if (hasOneOccurrencePerTarget(filled, placements)) {
              return {
                grid: filled,
                placements,
                size,
                mode
              };
            }
          }
        }
      }
    }

    return null;
  }

  function lineBetween(start, end) {
    const rowDifference = end.row - start.row;
    const columnDifference = end.column - start.column;
    const isStraight = (
      rowDifference === 0 ||
      columnDifference === 0 ||
      Math.abs(rowDifference) === Math.abs(columnDifference)
    );

    if (!isStraight || (rowDifference === 0 && columnDifference === 0)) {
      return null;
    }

    const rowStep = Math.sign(rowDifference);
    const columnStep = Math.sign(columnDifference);
    const length = Math.max(Math.abs(rowDifference), Math.abs(columnDifference)) + 1;

    return Array.from({ length }, (_, index) => ({
      row: start.row + (rowStep * index),
      column: start.column + (columnStep * index)
    }));
  }

  function isDirectionAllowed(start, end, mode) {
    if (mode !== "simple") return true;
    return (
      (start.row === end.row && end.column > start.column) ||
      (start.column === end.column && end.row > start.row)
    );
  }

  return {
    ALL_DIRECTIONS,
    SIMPLE_DIRECTIONS,
    createPuzzle,
    eligibleEntries,
    isDirectionAllowed,
    lineBetween,
    normaliseWord,
    occurrenceCount,
    wordForEntry
  };
})();
