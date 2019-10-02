function useDND(state, setState) {

    const reorder = (list, startIndex, endIndex) => {
        const result = list;
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    const onDragEnd = (result) => {
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;

        const numbers = reorder(state, result.source.index, result.destination.index);

        setState(numbers);
    }

    return {
        onDragEnd,
        reorder,
    }
}

export default useDND
