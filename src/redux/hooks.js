import { useDispatch, useSelector } from "react-redux";

/** @type {() => import('redux/store').AppDispatch} */
export const useAppDispatch = useDispatch
/** @type {import('react-redux').TypedUseSelectorHook<import('redux/store').RootState>} */
export const useAppSelector = useSelector
