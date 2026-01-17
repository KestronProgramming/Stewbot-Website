import { useState, useEffect } from 'preact/hooks';

const colors = {
  "Module": "grey",
  "Context_Menu": "grey",
  "Safety": "red",
  "Bot": "darkCyan",
  "Administration": "red",
  "Configuration": "blue",
  "Entertainment": "darkGreen",
  "Information": "brown",
  "General": "brown",
  "Server_Only": "brown"
};
const catImportance = Object.keys(colors);

export function Commands({ pageData = {} }) {
  const [helpCommands, setHelpCommands] = useState(pageData.helpCommands || []);
  const [categories, setCategories] = useState(pageData.categories || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('or');
  const [selectedCategories, setSelectedCategories] = useState({});
  const [filteredCommands, setFilteredCommands] = useState([]);

  useEffect(() => {
    // If no data, fetch from GitHub
    if (helpCommands.length === 0 || categories.length === 0) {
      // Fetch help commands
      fetch('https://raw.githubusercontent.com/Stewared/Stewbot/refs/heads/main/data/helpPages.json')
        .then(res => res.json())
        .then(helpData => {
          setHelpCommands(helpData || []);

          // Fetch categories
          return fetch('https://raw.githubusercontent.com/Stewared/Stewbot/refs/heads/main/commands/modules/Categories.js');
        })
        .then(res => res.text())
        .then(categoryText => {
          const module = { exports: {} };

          // UNSAFE but intentional
          new Function("module", "exports", categoryText)(module, module.exports);

          const Categories = module.exports;
          const parsedCategories = Object.values(Categories);

          setCategories(parsedCategories);

          const initialSelected = {};
          parsedCategories.forEach(cat => {
            initialSelected[cat] = true;
          });
          setSelectedCategories(initialSelected);
        })
        .catch(err => console.error('Failed to fetch commands data:', err));
    } else {
      // Initialize all categories as selected from props
      const initialSelected = {};
      categories.forEach(cat => {
        initialSelected[cat] = true;
      });
      setSelectedCategories(initialSelected);
    }
  }, []);

  useEffect(() => {
    updateCommandList();
  }, [searchTerm, filterMode, selectedCategories, helpCommands]);

  function updateCommandList() {
    const selectedCats = Object.keys(selectedCategories).filter(cat => selectedCategories[cat]);

    const newCommands = helpCommands.filter(command => {
      const matchesSearch = command.name.includes(searchTerm) ||
        command.shortDesc.includes(searchTerm) ||
        command.detailedDesc.includes(searchTerm);

      switch (filterMode) {
        case 'and':
          return selectedCats.every(cat => command.helpCategories.includes(cat)) && matchesSearch;
        case 'or':
          return selectedCats.some(cat => command.helpCategories.includes(cat)) && matchesSearch;
        case 'not':
          return !selectedCats.some(cat => command.helpCategories.includes(cat)) && matchesSearch;
        default:
          return matchesSearch;
      }
    });

    setFilteredCommands(newCommands);
  }

  function handleCategoryChange(cat, checked) {
    setSelectedCategories(prev => ({
      ...prev,
      [cat]: checked
    }));
  }

  function getCommandColor(command) {
    const highestPriorityCat = command.helpCategories.reduce((a, b) =>
      catImportance.indexOf(a) < catImportance.indexOf(b) ? a : b
    );
    return colors[highestPriorityCat] || "grey";
  }

  return (
    <>
      <h1 class="centered" id="commands">Commands</h1>
      <div class="content">
        <h3>Filters</h3>
        <div class="searchWrapper">
          <label for="searchTerm">Search term:</label>
          <div class="searchInputGroup">
            <input
              placeholder="Search term..."
              class="input"
              id="searchTerm"
              value={searchTerm}
              onInput={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="button"
              value="Search"
              class="button"
              id="searchButton"
              onClick={() => updateCommandList()}
            />
          </div>
        </div>
        <div class="filterOptions">
          <label>Filter Mode:
            <select
              name="filterMode"
              class="select"
              id="filterMode"
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
            >
              <option value="or">Or</option>
              <option value="and">And</option>
              <option value="not">Not</option>
            </select>
          </label>
        </div>
        <div class="categoryFilters">
          <p>Categories:</p>
          {categories.map(cat => (
            <label class="categoryLabel" key={cat}>
              <input
                type="checkbox"
                name={cat}
                class="categoriesCheckboxes"
                checked={selectedCategories[cat] || false}
                onChange={(e) => handleCategoryChange(cat, e.target.checked)}
              /> {cat}
            </label>
          ))}
        </div>
      </div>
      <div id="commandsDiv">
        {filteredCommands.map((command, index) => (
          <div class={`command ${getCommandColor(command)}`} key={index}>
            <h6>{command.helpCategories.join(", ")}</h6>
            <h2>{command.name}</h2>
            <h5>{command.shortDesc}</h5>
            <p dangerouslySetInnerHTML={{ __html: command.detailedDesc }}></p>
            {command.helpCategories.includes("Context Menu") && (
              <h5>This is a context menu command. <a href="/contextMenu" target="_blank">How to use the context menu</a></h5>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
