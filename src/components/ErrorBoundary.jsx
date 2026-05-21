import { Component } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import MagneticButton from './MagneticButton'

/**
 * Catches unexpected React render errors and shows a recovery UI.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('TeaSphere ErrorBoundary:', error, info)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-cream px-5 py-24">
          <div className="glass-panel max-w-lg p-10 text-center">
            <AlertTriangle className="mx-auto mb-6 h-14 w-14 text-gold" strokeWidth={1.25} />
            <h1 className="font-display text-3xl text-forest">Something went wrong</h1>
            <p className="mt-4 text-sm text-charcoal/70">
              An unexpected error occurred. Please refresh or return home.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <pre className="mt-4 max-h-32 overflow-auto rounded-lg bg-forest/5 p-3 text-left text-xs text-charcoal/60">
                {this.state.error.message}
              </pre>
            )}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton onClick={this.handleRetry}>Return Home</MagneticButton>
              <Link to="/menu" className="btn-outline-tea inline-flex items-center">
                Tea Menu
              </Link>
            </div>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
