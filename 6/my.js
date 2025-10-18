// Базовые цены для разных типов товаров
const basePrices = {
    'pen': 35,      // Ручка (штука)
    'pencil': 30,   // Карандаш (штука)
    'notebook': 95  // Тетрадь (80 страниц)
};

// Дополнительные цены для опций
const optionPrices = {
    // Опции для ручки и карандаша
    'single': 0,    // Штука (базовая цена)
    'set': 100,     // Набор (+100 руб к базовой)
    
    // Опции для тетради (количество страниц)
    '80': 0,        // 80 страниц (базовая цена)
    '120': 20,      // 120 страниц (+20 руб)
    '200': 40       // 200 страниц (+40 руб)
};

// Цена за дополнительное свойство
const propertyPrice = 50;

// Получаем элементы DOM
document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    const productTypeRadios = document.querySelectorAll('input[name="prodType"]');
    const penPencilOptions = document.getElementById('penPencilOptions');
    const notebookOptions = document.getElementById('notebookOptions');
    const propertyGroup = document.getElementById('propertyGroup');
    const propertyCheckbox = document.getElementById('property');
    const priceDisplay = document.getElementById('prodPrice');

    // Функция для обновления видимости элементов
    function updateFormVisibility() {
        const selectedProductType = document.querySelector('input[name="prodType"]:checked').value;
        
        // Сбрасываем значения при смене типа товара
        propertyCheckbox.checked = false;
        
        // Управляем видимостью в зависимости от типа товара
        switch(selectedProductType) {
            case 'pen': // Ручка
            case 'pencil': // Карандаш
                penPencilOptions.classList.remove('hidden');
                notebookOptions.classList.add('hidden');
                propertyGroup.classList.add('hidden');
                break;
            case 'notebook': // Тетрадь
                penPencilOptions.classList.add('hidden');
                notebookOptions.classList.remove('hidden');
                propertyGroup.classList.remove('hidden');
                break;
        }
    }

    // Функция для расчета общей стоимости
    function calculateTotalPrice() {
        const selectedProductType = document.querySelector('input[name="prodType"]:checked').value;
        const quantity = parseInt(quantityInput.value) || 1;
        
        let basePrice = basePrices[selectedProductType];
        let optionPrice = 0;
        
        // Добавляем стоимость опций в зависимости от типа товара
        if (selectedProductType === 'pen' || selectedProductType === 'pencil') {
            const selectedOption = document.querySelector('input[name="penPencilOption"]:checked').value;
            optionPrice = optionPrices[selectedOption];
        } else if (selectedProductType === 'notebook') {
            const selectedOption = document.querySelector('input[name="notebookOption"]:checked').value;
            optionPrice = optionPrices[selectedOption];
        }
        
        let totalPrice = (basePrice + optionPrice) * quantity;
        
        // Добавляем стоимость свойства (только для тетради)
        if (selectedProductType === 'notebook' && propertyCheckbox.checked) {
            totalPrice += propertyPrice * quantity;
        }
        
        // Обновляем отображение цены с анимацией
        priceDisplay.textContent = `Итоговая стоимость: ${totalPrice} руб.`;
        priceDisplay.classList.add('price-change');
        setTimeout(() => priceDisplay.classList.remove('price-change'), 500);
    }

    // Инициализация при загрузке страницы
    updateFormVisibility();
    calculateTotalPrice();

    // Обработчики событий
    quantityInput.addEventListener('input', calculateTotalPrice);
    
    productTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateFormVisibility();
            calculateTotalPrice();
        });
    });
    
    // Обработчики для опций ручки/карандаша
    document.querySelectorAll('input[name="penPencilOption"]').forEach(radio => {
        radio.addEventListener('change', calculateTotalPrice);
    });
    
    // Обработчики для опций тетради
    document.querySelectorAll('input[name="notebookOption"]').forEach(radio => {
        radio.addEventListener('change', calculateTotalPrice);
    });
    
    propertyCheckbox.addEventListener('change', calculateTotalPrice);
});
