import Head from 'next/head'
import SleepCycleCalculator from '../components/SleepCycleCalculator'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Head>
        <title>Sleep Cycle Calculator</title>
        <meta name="description" content="Optimize your sleep schedule with our Sleep Cycle Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SleepCycleCalculator />
      </main>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2023 Sleep Cycle Calculator. All rights reserved.
      </footer>
    </div>
  )
}
