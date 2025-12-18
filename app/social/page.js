import InstagramFeed from "@/components/social/InstagramFeed";

export default function SocialPage() {
  return (
    <main>
      <section className="flex flex-col items-center justify-center mt-16 mx-10 gap-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Instagram Feed</h1>
          <p className="text-muted-foreground">
            Latest posts from Whitworth Instagram accounts
          </p>
        </div>
        <InstagramFeed />
      </section>
    </main>
  );
}
