export default async function Page() {
  let data = await fetch('https://api.vercel.app/blog',{ next: { revalidate: false | 0 | 3600 } })
  let posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

// export const dynamic = 'force-dynamic'