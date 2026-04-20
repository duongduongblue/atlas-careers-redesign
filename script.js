const state = {
  dept: 'All',
  location: 'All',
  level: 'All',
  search: '',
};

const chips = document.querySelectorAll('.chip');
const searchInput = document.getElementById('roleSearch');
const roleCards = Array.from(document.querySelectorAll('.role-card'));
const visibleCount = document.getElementById('visibleCount');
const emptyState = document.getElementById('emptyState');
const roleList = document.getElementById('roleList');
const resetButton = document.getElementById('resetFilters');

function matchesFilter(card, key, value) {
  if (value === 'All') return true;
  const raw = card.dataset[key] || '';
  const values = raw.split(',').map((item) => item.trim());
  return values.includes(value);
}

function matchesSearch(card, searchValue) {
  if (!searchValue) return true;
  return (card.dataset.search || '').includes(searchValue.toLowerCase());
}

function applyFilters() {
  let count = 0;

  roleCards.forEach((card) => {
    const isVisible =
      matchesFilter(card, 'dept', state.dept) &&
      matchesFilter(card, 'location', state.location) &&
      matchesFilter(card, 'level', state.level) &&
      matchesSearch(card, state.search);

    card.classList.toggle('hidden', !isVisible);
    if (isVisible) count += 1;
  });

  visibleCount.textContent = String(count);
  emptyState.classList.toggle('hidden', count !== 0);
  roleList.classList.toggle('hidden', count === 0);
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const group = chip.dataset.filterGroup;
    const value = chip.dataset.filterValue;
    if (!group || !value) return;

    state[group] = value;

    document
      .querySelectorAll(`.chip[data-filter-group="${group}"]`)
      .forEach((button) => button.classList.remove('active'));

    chip.classList.add('active');
    applyFilters();
  });
});

searchInput?.addEventListener('input', (event) => {
  state.search = event.target.value.trim().toLowerCase();
  applyFilters();
});

resetButton?.addEventListener('click', () => {
  state.dept = 'All';
  state.location = 'All';
  state.level = 'All';
  state.search = '';

  chips.forEach((chip) => {
    chip.classList.toggle('active', chip.dataset.filterValue === 'All');
  });

  if (searchInput) searchInput.value = '';
  applyFilters();
});

applyFilters();
