import Moment from 'moment';

export const Note = function(obj) {

    if (obj.hasOwnProperty('_id')) {
        this._id = obj._id;
    }

    // // _uid is 'private' (haha) and should never be overwritten, therefor make a read only property for uid
    // Object.defineProperty(this, '_id', {
    //     get() {
    //         return (this._uid) ? this._uid : 0; // returns 0 when no _uid is set
    //     }
    // });

    Object.defineProperty(this, 'createdDateFormatted', {
        get() {
            return (this.createdDate) ? this.createdDate.format('DD.MM.YYYY') : '';
        }
    });

    Object.defineProperty(this, 'dueDateFormatted', {
        get() {
            return (this.dueDate) ? this.dueDate.format('DD.MM.YYYY') : '';
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

    Object.defineProperty(this, 'dueDate', {
        get() {
            return this._dueDate;
        },
        set(val) {
            if(val instanceof Moment)
                this._dueDate = val;
            else
                this._dueDate = new Moment(val, 'DD.MM.YYYY');
        }
    });

    this.dueDate = obj.dueDate;

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
    if (note.hasOwnProperty('_id')) {
        obj._id = note._id;
    }
    // obj._id = note._id;
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
