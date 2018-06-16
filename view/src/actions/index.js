import axios from "axios";
import { setAuthToken } from "../utils/utils";
import { notify } from "reapop";

export const showMessage = notify;

export const fetchUser = () => {
  return dispatch => {
    axios
      .get("/api/current_user")
      .then(res => {
        return dispatch({
          type: "FETCH_USER",
          payload: res.data
        });
      })
      .catch(e => {
        localStorage.removeItem("token");
        window.location.replace("/");
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        });
      });
  };
};

export const registerUser = data => {
  return dispatch => {
    dispatch({
      type: "WAIT",
      payload: true
    });
    axios({
      url: "/auth/register",
      method: "post",
      data: data
    })
      .then(res => {
        dispatch({
          type: "WAIT",
          payload: null
        });
        dispatch({
          type: "MESSAGE",
          payload: res.data.message
        });
      })
      .catch(e => {
        dispatch({
          type: "WAIT",
          payload: null
        });
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        });
      });
  };
};

export const verifyUser = token => {
  return dispatch => {
    dispatch({
      type: "WAIT",
      payload: true
    });
    axios({
      method: "post",
      url: `/auth/verification`,
      data: { token }
    })
      .then(res => {
        dispatch({
          type: "WAIT",
          payload: null
        });
        return dispatch({
          type: "MESSAGE",
          payload: res.data.message
        });
      })
      .catch(e => {
        dispatch({
          type: "WAIT",
          payload: null
        });
        dispatch({
          type: "VERIFICATION_ERROR",
          payload: e.response.data.message
        });
      });
  };
};

export const resendVarification = email => {
  return dispatch => {
    dispatch({
      type: "WAIT",
      payload: true
    });
    axios({
      method: "post",
      url: "/auth/resending_verification",
      data: { email }
    })
      .then(res => {
        dispatch({
          type: "WAIT",
          payload: null
        });
        dispatch({
          type: "MESSAGE",
          payload: res.data.message
        });
      })
      .catch(e => {
        dispatch({
          type: "WAIT",
          payload: null
        });
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        });
      });
  };
};

export const resetVerificationError = () => {
  return {
    type: "VERIFICATION_ERROR",
    payload: null
  };
};

export const login = data => {
  return dispatch => {
    dispatch({
      type: "WAIT",
      payload: true
    });
    axios({
      url: "/auth/login",
      method: "post",
      data: data
    })
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("token", token);
        setAuthToken(token);
        axios.get("/api/current_user").then(res => {
          window.location.replace("/");
          dispatch({
            type: "WAIT",
            payload: null
          });
          dispatch({
            type: "FETCH_USER",
            payload: res.data
          });
        });
      })
      .catch(e => {
        if (e.response.data.message === "Your account has not been verified") {
          dispatch({
            type: "WAIT",
            payload: null
          });
          return dispatch({
            type: "VERIFICATION_ERROR",
            payload: e.response.data.message
          });
        } else {
          dispatch({
            type: "WAIT",
            payload: null
          });
          dispatch({
            type: "MESSAGE",
            payload: e.response.data.message
          });
        }
      });
  };
};

export const logoutUser = () => {
  return dispatch => {
    localStorage.removeItem("token");
    setAuthToken(false);
    window.location.replace("/");
    dispatch({
      type: "FETCH_USER",
      payload: false
    });
  };
};

export const openRequestPassword = state => {
  return {
    type: "RESET_PASSWORD",
    payload: state
  };
};

export const resetPasswordFormReq = token => {
  return dispatch => {
    dispatch({
      type: "WAIT",
      payload: true
    });
    axios({
      method: "post",
      url: "/auth/verify_password_token",
      data: { token }
    })
      .then(res => {
        return dispatch({
          type: "RESET_PASSWORD",
          payload: "ok"
        });
      })
      .catch(e => {
        dispatch({
          type: "WAIT",
          payload: null
        });
        dispatch({
          type: "VERIFICATION_ERROR",
          payload: e.response.data.message
        });
      });
  };
};

export const resetPassword = data => {
  return dispatch => {
    dispatch({
      type: "WAIT",
      payload: true
    });
    axios({
      method: "post",
      url: `/auth/reset_password`,
      data: data
    })
      .then(res => {
        dispatch({
          type: "WAIT",
          payload: false
        });
        return dispatch({
          type: "MESSAGE",
          payload: res.data.message
        });
      })
      .catch(e => {
        dispatch({
          type: "WAIT",
          payload: null
        });
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        });
      });
  };
};

export const RequestPassword = email => {
  return dispatch => {
    dispatch({
      type: "WAIT",
      payload: true
    });
    axios({
      method: "post",
      url: "/auth/req_reset_password",
      data: { email }
    })
      .then(res => {
        dispatch({
          type: "WAIT",
          payload: null
        });
        dispatch({
          type: "MESSAGE",
          payload: res.data.message
        });
      })
      .catch(e => {
        dispatch({
          type: "WAIT",
          payload: null
        });
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        });
      });
  };
};

export const resetUser = () => {
  return {
    type: "FETCH_USER",
    payload: false
  };
};

export const updateUser = values => {
  return dispatch => {
    axios({
      method: "put",
      url: `/api/current_user`,
      data: values
    })
      .then(res => {
        dispatch({
          type: "FETCH_USER",
          payload: res.data
        });
        window.location.replace("/dashboard/personal_info");
      })
      .catch(e =>
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        })
      );
  };
};

export const fetchProfileInfo = _id => {
  return dispatch =>
    axios({
      method: "get",
      url: `/api/user/${_id}`
    })
      .then(res =>
        dispatch({
          type: "FETCH_PROFILE_INFO",
          payload: res.data
        })
      )
      .catch(e =>
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        })
      );
};

export const fetchAds = (values, _id) => {
  if (_id) {
    return dispatch => {
      axios
        .get(`/api/advertise/${_id}`)
        .then(res => {
          res.data.tags = res.data.tags.map(tag => {
            return {
              value: tag,
              label: tag,
              className: "Select-create-option-placeholder"
            };
          });
          dispatch({
            type: "FETCH_ADS",
            payload: res.data
          });
        })
        .catch(e => {
          return dispatch({
            type: "MESSAGE",
            payload: e.response.data.message
          });
        });
    };
  }
  let url = "/api/advertise?";
  const params = [
    {
      param: "sortBy",
      value: `sortBy=${values.sortBy}`
    },
    {
      param: "term",
      value: `&term=${values.term}`
    },
    {
      param: "category",
      value: `&category=${values.category}`
    },
    {
      param: "priceFrom",
      value: `&priceFrom=${values.priceFrom}`
    },
    {
      param: "priceTo",
      value: `&priceTo=${values.priceTo}`
    },
    {
      param: "order",
      value: `&order=${values.order}`
    },
    {
      param: "country",
      value: `&country=${values.country}`
    },
    {
      param: "region",
      value: `&region=${values.region}`
    },
    {
      param: "skip",
      value: `&skip=${values.skip}`
    }
  ];
  params.forEach(item => {
    if (values[item.param]) {
      return (url += item.value);
    }
  });
  return dispatch => {
    axios({
      method: "get",
      url: url
    })
      .then(res => {
        return dispatch({
          type: "FETCH_ADS",
          payload: res.data
        });
      })
      .catch(e => {
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        });
      });
  };
};

export const fetchUserAds = skip => {
  return dispatch => {
    axios
      .get(`/api/current_user/advertises?skip=${skip}`)
      .then(res =>
        dispatch({
          type: "SEARCH_ADS",
          payload: res.data
        })
      )
      .catch(e =>
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        })
      );
  };
};

export const fetchFavAds = skip => {
  return dispatch => {
    axios
      .get(`/api/current_user/advertises?skip=${skip}&type=Fav`)
      .then(res =>
        dispatch({
          type: "SEARCH_ADS",
          payload: res.data
        })
      )
      .catch(e =>
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        })
      );
  };
};

export const fetchUnseenMessages = () => {
  return dispatch => {
    axios({
      url: "/api/user_unseen_messages"
    })
      .then(res => {
        dispatch({
          type: "UNSEEN_MESSAGES",
          payload: res.data
        });
      })
      .catch(e =>
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        })
      );
  };
};

export const resetReducer = () => {
  return {
    type: "RESET_ADS",
    payload: null
  };
};

export const createAd = values => {
  return dispatch => {
    axios({
      method: "post",
      url: "/api/advertise",
      data: values
    })
      .then(res =>
        dispatch({
          type: "CREATE_AD",
          payload: res.data
        })
      )
      .catch(e =>
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        })
      );
  };
};

export const updateAd = (values, _id) => {
  return dispatch => {
    axios({
      method: "put",
      url: `/api/advertise/${_id}`,
      data: values
    })
      .then(res => {
        dispatch({
          type: "UPDATE_AD",
          payload: res.data
        });
      })
      .catch(e =>
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        })
      );
  };
};

export const deleteAd = _id => {
  return dispatch => {
    axios({
      method: "delete",
      url: `/api/advertise/${_id}`
    })
      .then(res => dispatch({ type: "DELETE_AD", payload: res.data }))
      .catch(e =>
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        })
      );
  };
};

export const searchAds = values => {
  let url = "/api/advertise?";
  const params = [
    {
      param: "sortBy",
      value: `sortBy=${values.sortBy}`
    },
    {
      param: "term",
      value: `&term=${values.term}`
    },
    {
      param: "category",
      value: `&category=${values.category}`
    },
    {
      param: "priceFrom",
      value: `&priceFrom=${values.priceFrom}`
    },
    {
      param: "priceTo",
      value: `&priceTo=${values.priceTo}`
    },
    {
      param: "order",
      value: `&order=${values.order}`
    },
    {
      param: "country",
      value: `&country=${values.country}`
    },
    {
      param: "region",
      value: `&region=${values.region}`
    },
    {
      param: "skip",
      value: `&skip=${values.skip}`
    }
  ];
  params.forEach(item => {
    if (values[item.param]) {
      return (url += item.value);
    }
  });
  return dispatch => {
    dispatch({
      type: "WAIT",
      payload: true
    });
    axios({
      method: "get",
      url: url
    })
      .then(res => {
        dispatch({
          type: "WAIT",
          payload: null
        });
        return dispatch({
          type: "SEARCH_ADS",
          payload: res.data
        });
      })
      .catch(e => {
        dispatch({
          type: "WAIT",
          payload: null
        });
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        });
      });
  };
};

export const addToFav = _id => {
  return dispatch => {
    axios({
      method: "post",
      url: "/api/fav",
      data: { _id }
    })
      .then(res =>
        dispatch({
          type: "ADD_FAV_AD",
          payload: res.data
        })
      )
      .catch(e =>
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        })
      );
  };
};
export const removeFromFav = _id => {
  return dispatch => {
    axios({
      method: "delete",
      url: `/api/fav/${_id}`
    })
      .then(res =>
        dispatch({
          type: "REMOVE_FAV_AD",
          payload: res.data
        })
      )
      .catch(e =>
        dispatch({
          type: "MESSAGE",
          payload: e.response.data.message
        })
      );
  };
};

export const fetchComments = data => {
  return {
    type: "FETCH_COMMENTS",
    payload: data
  };
};

export const fetchConversation = conv => {
  return dispatch => {
    dispatch({
      type: "FETCH_CONV",
      payload: conv
    });
  };
};

export const sendNotificatios = message => {
  return {
    type: "SEND_NOTIFICATION",
    payload: message
  };
};

export const currentConversation = _id => {
  return dispatch => {
    dispatch({
      type: "CURRENT_CONV",
      payload: _id
    });
  };
};

export const sendMessage = _id => {
  return {
    type: "MESSAGE_RECIEVER",
    payload: _id
  };
};

export const openConversation = _id => {
  return dispatch => {
    dispatch({
      type: "OPEN_CONV",
      payload: _id
    });
  };
};

export const resetConversation = () => {
  return {
    type: "RESET_CONV",
    payload: null
  };
};

export const resetFlashMessage = () => {
  return {
    type: "RESET_FLASH_MESSAGE",
    payload: null
  };
};

export const fetchUserConversations = () => {
  return dispatch => {
    axios({
      method: "get",
      url: `/api/current_user/conversations`
    }).then(res =>
      dispatch({
        type: "FETCH_USER_CONVERSATIONS",
        payload: res.data
      })
    );
  };
};

export const sendFlashMessage = message => {
  return {
    type: "MESSAGE",
    payload: message
  };
};
