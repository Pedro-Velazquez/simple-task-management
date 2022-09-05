import {useReducer} from "react";

export type UseToggle = [boolean, () => void]

export default function useToggle(init = false): UseToggle {
  const [value, toggle] = useReducer((state: boolean) => !state, false)
  return [value, toggle]
}
