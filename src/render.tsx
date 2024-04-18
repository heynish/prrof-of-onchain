import { FC } from 'hono/jsx'

export const renderVerifyElement = (h1: string, p1: string, content: any) => {
  return (
    <div style={{
      backgroundColor: '#81e9d4',
      textAlign: 'center',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: 500,
        width: 1000,
        height: 1000,
        position: 'absolute',
        top: '50%',
        left: '52%',
        display: 'flex',
        transform: 'translate(-50%, -50%)',
      }}></div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: 36 }}>{h1}</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 'auto' }}>
        <p style={{ fontSize: 36 }}>{p1}</p>
      </div>
      {content}
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 'auto', marginBottom: 0 }}>
        <img
          src="/infura.png"
          alt="Infura Logo"
          style={{ height: 150, marginRight: 20 }}
        />
        <img
          src="/din.png"
          alt="DAN Logo"
          style={{ height: 80, marginRight: 20 }}
        />
        <img
          src="/diligence.png"
          alt="ConsenSys Diligence Logo"
          style={{ height: 80 }}
        />
      </div>
    </div>
  )
}
