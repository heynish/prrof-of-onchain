


export const renderVerifyElement = (h1: string, p1: string) => {
  return (
    <div style={{
      backgroundColor: '#c9f8ff',
      textAlign: 'center',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '50%',
        width: '120%',
        height: '120%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        display: 'flex',
        transform: 'translate(-50%, -50%)',
        zIndex: 1
      }}></div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: 36 }}>{h1}</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 'auto' }}>
        <p style={{ fontSize: 24 }}>{p1}</p>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 'auto', marginBottom: 0 }}>
        <img
          src="/infura.png"
          alt="Infura Logo"
          style={{ height: 100, marginRight: 20 }}
        />
        <img
          src="/infura.png"
          alt="DAN Logo"
          style={{ height: 30, width: 30, marginRight: 20 }}
        />
        <img
          src="/diligence.png"
          alt="ConsenSys Diligence Logo"
          style={{ height: 50 }}
        />
      </div>
    </div>
  )
}
