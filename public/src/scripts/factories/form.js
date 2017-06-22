import observer from '../libs/observer';
import Pikaday from '../libs/pikaday';

// Form Factory
export const createForm = container => {
    const instance = Object.assign({}, observer()); // Object composition

    const elements = {
        form: container,
        id: container.querySelector('[data-form-id]'),
        title: container.querySelector('[data-form-title]'),
        description: container.querySelector('[data-form-description]'),
        importance: container.querySelector('[data-form-importance]'),
        dueDate: container.querySelector('[data-form-due]'),
        cancleButton: container.querySelector('[data-btn-cancle]')
    };

    const picker = new Pikaday({
        field: elements.dueDate,
        format: 'DD.MM.YYYY',
        firstDay: 1,
        minDate: new Date(),
        defaultDate: new Date(),
        setDefaultDate: true
    });

    instance.populateFields = data => {
        elements.id.value = data._id;
        elements.title.value = data.title;
        elements.description.value = data.description;
        elements.importance.value = data.importance;
        elements.dueDate.value = data.dueDateFormatted;
        picker.setMoment(data.dueDate);
    };

    instance.clear = () => {
        elements.id.value = '';
        elements.title.value = '';
        elements.description.value = '';
        elements.importance.value = '1';
        elements.dueDate.value = '';
        picker.setDate(new Date());
    };

    elements.form.addEventListener('submit', e => {
        e.preventDefault();

        const data = {
            title: elements.title.value,
            description: elements.description.value,
            importance: elements.importance.value,
            dueDate: elements.dueDate.value
        };

        if (elements.id.value !== '')
            data._id = elements.id.value;

        instance.trigger('submit', data);
    });

    elements.cancleButton.addEventListener('click', e => {
        e.preventDefault();
        instance.trigger('cancle');
    });

    return instance;
};
