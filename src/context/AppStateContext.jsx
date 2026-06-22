/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from 'react'

const AppStateContext = createContext(null)

const STORAGE_KEY = 'sellerguide.appstate.v1'

const defaultOnboarding = {
  registrationStatus: '',
  businessType: '',
  workplaceLease: '',
  platforms: [],
}

function loadInitialState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    return {
      onboarding: { ...defaultOnboarding, ...(raw?.onboarding || {}) },
      checklist: raw?.checklist || {},
    }
  } catch {
    return { onboarding: { ...defaultOnboarding }, checklist: {} }
  }
}

function checklistVariantKey(type, status) {
  return `${type}_${status || 'not_started'}`
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ONBOARDING_FIELD':
      return {
        ...state,
        onboarding: { ...state.onboarding, [action.field]: action.value },
      }
    case 'SET_PLATFORMS':
      return {
        ...state,
        onboarding: { ...state.onboarding, platforms: action.platforms },
      }
    case 'TOGGLE_CHECKLIST_STEP': {
      const key = checklistVariantKey(action.checklistType, action.status)
      const variant = state.checklist[key] || { completed: {} }
      return {
        ...state,
        checklist: {
          ...state.checklist,
          [key]: {
            completed: {
              ...variant.completed,
              [action.index]: !variant.completed[action.index],
            },
          },
        },
      }
    }
    default:
      return state
  }
}

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  function setOnboardingField(field, value) {
    dispatch({ type: 'SET_ONBOARDING_FIELD', field, value })
  }

  function setPlatforms(platforms) {
    dispatch({ type: 'SET_PLATFORMS', platforms })
  }

  function toggleChecklistStep(checklistType, status, index) {
    dispatch({ type: 'TOGGLE_CHECKLIST_STEP', checklistType, status, index })
  }

  function getChecklistState(checklistType, status) {
    const key = checklistVariantKey(checklistType, status)
    return state.checklist[key]?.completed || {}
  }

  const value = {
    onboarding: state.onboarding,
    setOnboardingField,
    setPlatforms,
    toggleChecklistStep,
    getChecklistState,
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}
