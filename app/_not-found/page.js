export default function NotFound() {
  return (
    <html>
      <body>
        <main style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#fff', background: '#000'}}>
          <div>
            <h1 style={{fontSize: 28, margin: 0}}>404 - Not Found</h1>
            <p style={{opacity: 0.75}}>The requested resource could not be found.</p>
          </div>
        </main>
      </body>
    </html>
  )
}
