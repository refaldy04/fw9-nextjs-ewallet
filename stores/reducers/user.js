const initialState = {
  transferData: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSFER': {
      return {
        ...state,
        transferData: (state.transferData = action.data),
      };
    }
    default: {
      return state;
    }
  }
};

export default user;
