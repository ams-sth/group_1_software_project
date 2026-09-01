import { Link } from 'react-router-dom'

const features = [
  'Split any expense equally, unequally, or by percentage',
  'See a running balance for every person in the house',
  'Set up recurring bills once and let them run themselves',
  'Record settlements without waiting on a payment gateway',
]

function LandingPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-10 p-6 text-center">
      <div className="flex max-w-md flex-col items-center gap-4">
        <h1 className="text-4xl font-semibold text-(--text-h)">SplitSync</h1>
        <p className="text-(--text)">
          Track shared expenses with your housemates — who paid, who owes, and who's
          settled up.
        </p>
        <Link
          to="/login"
          className="mt-2 rounded-lg bg-(--accent) px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          Get started
        </Link>
      </div>

      <ul className="flex max-w-sm flex-col gap-2 text-left text-sm text-(--text)">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span aria-hidden="true">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default LandingPage
