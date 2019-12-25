/**
 * @desc Check there are any selected selections
 * @param options
 * @return {number}
 */
const hasSelections = options => {
    if (!(options instanceof NodeList)) throw new Error('options must be an instance of NodeList class');

    let index = null;

    options && options.length && options.forEach((opt, i) => {
        if (opt.classList.contains('selected')) index = i;
    });

    return index  !== null ? index : -1;
};

/**
 * @desc It clears selected items
 * @param options
 * @return {void}
 */
const clearSelection = options => {
    if (!(options instanceof NodeList)) throw new Error('options must be an instance of NodeList class');
    options && options.length && options.forEach(opt => opt.classList.remove('selected'));
};

/**
 * @desc Handle arrow down event
 * @return {null}
 * @param options
 */
const arrowDown = options => {
    if (!(options instanceof NodeList)) throw new Error('options must be an instance of NodeList class');

    let currentSelectionIndex = hasSelections(options);

    if(!options.length) return null;

    // Remove class from current select element
    const currentOption = options.item(currentSelectionIndex);
    currentOption && currentOption.classList.remove('selected');

    if (currentSelectionIndex + 1 >= options.length) currentSelectionIndex = -1;

    // Add class into next element
    const nextOption = options.item(currentSelectionIndex + 1);
    nextOption.classList.add('selected');

};

/**
 * @desc Handle arrow up event
 * @return {null}
 * @param options
 */
const arrowUp = options => {
    if (!(options instanceof NodeList)) throw new Error('options must be an instance of NodeList class');

    let currentSelectionIndex = hasSelections(options);

    if(!options.length) return null;

    if (currentSelectionIndex === -1) currentSelectionIndex = options.length;

    // Remove class from current select element
    const currentOption = options.item(currentSelectionIndex);
    currentOption && currentOption.classList.remove('selected');

    if (currentSelectionIndex === 0) currentSelectionIndex = options.length;

    // Add class into next element
    const prevOption = options.item(currentSelectionIndex - 1);
    prevOption.classList.add('selected');

};

module.exports = {
    arrowDown,
    arrowUp,
    hasSelections,
    clearSelection
};
