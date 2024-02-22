export function reducer(state, action) {
    switch (action.type) {
        case 'update_name': {
            return {
                ...state,
                [action.key]: action.nextName
            };
        }
    }
    throw Error('Unknown action.');
}