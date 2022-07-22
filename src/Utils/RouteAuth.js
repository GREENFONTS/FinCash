import {
  setAuthenticated,
  setLoading,
  verifyToken,
  setState,
} from "../redux/features/Users/auth";
import {
  accountSetState
} from "../redux/features/Users/accounts";

export const AccessRoute = (token, expiryDate, monoKey, transactions, allTransactions, recentTransactions,  dispatch) => {
  if ( transactions !== undefined) {
    transactions = JSON.parse( transactions);
  }
  if ( allTransactions !== undefined) {
    allTransactions = JSON.parse( allTransactions);
  }
  if (recentTransactions !== undefined) {
    recentTransactions = JSON.parse( recentTransactions);
  }

  dispatch(setLoading(true));
  
  if (token === null) {
    dispatch(setLoading(false));
    dispatch(setAuthenticated(false));
    localStorage.clear();
  } 
  else {
    var currentTime = new Date().getTime();
    var tokenTime = new Date(expiryDate).getTime();
    if (currentTime > tokenTime) {
      dispatch(setAuthenticated(false));
      dispatch(setLoading(false));
      localStorage.clear();
    } 
  else {
     //dispatch(setState({ token, user, expiryDate, monoKey }));
    // dispatch(accountSetState({ transactions, allTransactions, recentTransactions}))
    dispatch(verifyToken(token));
     }
}
};
