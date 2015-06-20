/**
 * Move item up or down
 * http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
 * @param old_index
 * @param new_index
 * @returns {Array}
 */
Array.prototype.move = function (old_index, new_index) {
    while (old_index < 0) {
        old_index += this.length;
    }
    while (new_index < 0) {
        new_index += this.length;
    }
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this;
};

/**
 * trim string
 * @returns {string}
 */
String.prototype.trim = function()
{
    return this.replace(/(^\s*)|(\s*$)/g, "");
};


var FLOAT_REGEXP = /^[0-9]{1,7}([.][0-9]{1,2})?$/;
var INTEGER_REGEXP = /^[0-9]{1,7}$/;
//只允许数字和中划线
var PHONE_REGEXP = /^([0-9]|-)*$/;