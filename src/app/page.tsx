export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-lg">Hello Drag&Drop</h1>
        <div className="flex flex-col gap-4">
          <a href="/dnd/case1" className="text-blue-500 hover:underline">
            ケース1：ドロップできるアイテムを制限する
          </a>
          <a href="/dnd/case2" className="text-blue-500 hover:underline">
            ケース2：ドラッグ中のアイテムを変更する
          </a>
        </div>
        </main>
    </div>
  );
}
