const defaultItems = [
    { id: 1, name: "Помідори", amount: 2, isBought: true },
    { id: 2, name: "Печиво", amount: 2, isBought: false },
    { id: 3, name: "Сир", amount: 1, isBought: false }
];

let items = JSON.parse(localStorage.getItem('buyList_items')) || defaultItems;

// DOM елементи
const mainList = document.querySelector('.main-list');
const sideBar = document.querySelector('.sidebar');
const addInput = document.querySelector('.add-section input');
const addBtn = document.querySelector('.btn-add');

function saveAndRender(){
  localStorage.setItem('buyList_items', JSON.stringify(items));
  renderList();
  renderSidebar();
}
function addItem() {
  const name = addInput.value.trim();
  if(!name) return;

  items.push({
    id: Date.now(),
    name: name,
    amount: 5,
    isBought: false
  })

  addInput.value = ''; // Очищення поля
    addInput.focus();  
    saveAndRender();
}
addBtn.addEventListener('click', addItem);
addInput.addEventListener('keydown', (e) =>{

  if(e.key === 'Enter'){
    addItem;
  }

});



function renderList() {

  const existingRows = mainList.querySelectorAll('.item-row');
  existingRows.forEach(row => row.remove());

  items.forEach(item => 
  {
    const row = document.createElement('div');
    row.className = 'item-row';
    row.dataset.id = item.id;
    if(item.isBought){
      row.innerHTML = `
                <span class="product-name">${item.name}</span>
                <span class="amount">${item.amount}</span>
                <button class="btn-status" data-tooltip="Позначити як не куплене">Не куплено</button>
            `;
    }else {
            // --- 3, 4, 6. Стан не купленого товару ---
            // Якщо кількість 1, кнопка мінус отримує атрибут disabled та стилі неактивності
            const isMinusDisabled = item.amount === 1 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : '';
            
            row.innerHTML = `
                <span class="product-name">${item.name}</span>
                <div class="controls">
                    <button class="btn-minus" data-tooltip="Зменшити" ${isMinusDisabled}>-</button>
                    <span class="amount">${item.amount}</span>
                    <button class="btn-plus" data-tooltip="Збільшити">+</button>
                </div>
                <button class="btn-bought" data-tooltip="Товар вже у кошику">Куплено</button>
                <button class="btn-remove" data-tooltip="Видалити зі списку">×</button>
            `;
        }

        mainList.appendChild(row);
  });

}


function renderSidebar() {

}



mainList.addEventListener('click', (e) => {
    const row = e.target.closest('.item-row');
    if (!row) return;

    const id = Number(row.dataset.id);
    const item = items.find(i => i.id === id);
    if (!item) return;

    //  (+)
    if (e.target.classList.contains('btn-plus')) {
        item.amount++;
        saveAndRender();
    }
    //  (-)
    else if (e.target.classList.contains('btn-minus')) {
        if (item.amount > 1) {
            item.amount--;
            saveAndRender();
        }
    }

    else if (e.target.classList.contains('btn-bought')) {
        item.isBought = true;
        saveAndRender();
    }
    // Позначити як НЕ куплений (Повернення в попередній стан)
    else if (e.target.classList.contains('btn-status')) {
        item.isBought = false;
        saveAndRender();
    }
    else if (e.target.classList.contains('btn-remove')) {
        items = items.filter(i => i.id !== id);
        saveAndRender();
    }
    else if (e.target.classList.contains('product-name') && !item.isBought) {
        const nameSpan = e.target;
        
        // Створення інпуту для редагування
        const input = document.createElement('input');
        input.type = 'text';
        input.value = item.name;
        input.className = 'edit-name-input';
        
        input.style.fontSize = '18px';
        input.style.padding = '4px 8px';
        input.style.width = '50%';
        input.style.border = '1px solid #4285f4';
        input.style.borderRadius = '4px';

      
        nameSpan.replaceWith(input);
        input.focus();

        // Обробка збереження при втраті фокусу (blur)
        input.addEventListener('blur', () => {
            const newName = input.value.trim();
            if (newName) {
                item.name = newName;
            }
            saveAndRender();
        });

        // Альтернативне збереження при натисканні Enter всередині інпуту
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                input.blur();
            }
        });
    }
});


saveAndRender();
