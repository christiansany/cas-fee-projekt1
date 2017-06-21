import Moment from 'moment';

export const Note = function(obj) {

    if (obj.hasOwnProperty('uid')) {
        this._uid = obj.uid;
    }

    // _uid is 'private' (haha) and should never be overwritten, therefor make a read only property for uid
    Object.defineProperty(this, 'uid', {
        get() {
            return (this._uid) ? this._uid : 0; // returns 0 when no _uid is set
        }
    });

    Object.defineProperty(this, 'createdDateFormatted', {
        get() {
            return this.createdDate.format('DD.MM.YYYY'); // TODO: return '' when no createdDate is set
        }
    });

    Object.defineProperty(this, 'dueDateFormatted', {
        get() {
            return (this.dueDate) ? this.dueDate.format('DD.MM.YYYY') : ''; // TODO: return '' when no dueDate is set
        },
        set(val) {
            this.dueDate = new Moment(val, 'DD.MM.YYYY');
        }
    });

    Object.defineProperty(this, 'finishDateFormatted', {
        get() {
            return (this.finishDate) ? this.finishDate.format('DD.MM.YYYY') : '';
        }
    });

    this.title = obj.title;
    this.description = obj.description;
    this.importance = obj.importance;

    if (obj.hasOwnProperty('createdDate')) {
        this.createdDate = new Moment(obj.createdDate);
    } else {
        this.createdDate = new Moment();
    }

    if (obj.hasOwnProperty('dueDate') && typeof obj.dueDate !== 'boolean') {
        this.dueDate = new Moment(obj.dueDate, 'DD.MM.YYYY'); // The due date is set via DD.MM.YYYY format, unlike other date related params
    } else {
        this.dueDate = false; // This should never happen
    }

    if (obj.hasOwnProperty('finishDate') && typeof obj.finishDate !== 'boolean') {
        this.finishDate = new Moment(obj.finishDate);
    } else {
        this.finishDate = false;
    }
};

// Serialize a note to be compatible with JSON
Note.serialize = (note) => {
    const obj = {};

    // Check if uid is set on the Note
    obj.uid = note.uid;
    obj.title = note.title;
    obj.description = note.description;
    obj.importance = note.importance;
    obj.createdDate = note.createdDate.format(); // Converts Moment object to UTC String
    obj.dueDate = note.dueDate.format('DD.MM.YYYY'); // Converts Moment object to UTC String
    obj.finishDate = (note.finishDate) ? note.finishDate.format() : false; // Converts Moment object to UTC String

    return obj;
};

// Parsing an object from JSON and returning a new Note
Note.parse = (note) => {
    return new Note(note);
};