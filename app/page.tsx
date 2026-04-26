import Header from '@/components/Header'
import Hero from '@/components/Hero'
import IntroText from '@/components/IntroText'
import AnatomyScroll from '@/components/AnatomyScroll'
import SpecsGrid from '@/components/SpecsGrid'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="w-full bg-bg-base" style={{ overflowX: 'clip' }}>
      <Header />
      <Hero />
      <IntroText />
      <AnatomyScroll />
      <SpecsGrid id="specs" />
      <Footer />
    </main>
  )
}
