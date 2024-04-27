export const metadata = {
  title: 'trend',
  description: '埋め込み用',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body style={{margin:0,padding:0,display:'flex',flexDirection:'column',width:'480px',overflow:'hidden'}}>{children}</body>
    </html>
  )
}
