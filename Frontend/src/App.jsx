import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import BudgetSummary from './components/BudgetSummary'
import { mockBudget, mockBudgetDetails } from './data/mockBudget'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      {/* ── Budget Planner ─────────────────────────────────────────
           Isolated section added for the budget-planner feature.
           Pass real budget + costs here when integrating with the
           Preference Form and Itinerary Planner.
      ──────────────────────────────────────────────────────────── */}
      <section
        id="budget-planner"
        style={{
          padding: '40px 24px 60px',
          background: '#f8f8f8',
          borderTop: '1px solid #e5e4e7',
        }}
      >
        <h2
          style={{
            fontFamily: 'system-ui, Segoe UI, Roboto, sans-serif',
            fontSize: '22px',
            fontWeight: 700,
            color: '#111111',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          Budget Planner
        </h2>
        <BudgetSummary
          budget={mockBudget}
          budgetDetails={mockBudgetDetails}
        />
      </section>
    </>
  )
}

export default App
