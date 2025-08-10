import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface QueuedFile {
  id: string;
  file: File;
  progress: number;
  status: "queued" | "uploading" | "done" | "error";
  url?: string;
  error?: string;
}

const bytesToSize = (bytes: number) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]; 
  if (bytes === 0) return "0 Byte"; 
  const i = Math.floor(Math.log(bytes) / Math.log(1024)); 
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
};

const Uploads: React.FC = () => {
  // SEO tags
  useEffect(() => {
    document.title = "Admin Uploads – Drag and Drop Uploader";

    const ensureMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    ensureMeta("description", "Admin uploads page with drag-and-drop uploader and progress for all devices.");

    // canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", window.location.href);
  }, []);

  const [files, setFiles] = useState<QueuedFile[]>([]);
  const [autoStart, setAutoStart] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef<HTMLLabelElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onFilesAdded = useCallback((list: FileList | null) => {
    if (!list || list.length === 0) return;
    const items: QueuedFile[] = Array.from(list).map((file) => ({
      id: crypto.randomUUID(),
      file,
      progress: 0,
      status: "queued",
    }));
    setFiles((prev) => [...items, ...prev]);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    onFilesAdded(e.dataTransfer.files);
  }, [onFilesAdded]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;
    el.addEventListener("dragover", (e) => { e.preventDefault(); });
    return () => {};
  }, []);

  // Simulated upload (replace with Supabase Storage once connected)
  const simulateUpload = useCallback((item: QueuedFile) => {
    return new Promise<string>((resolve) => {
      const totalTime = Math.min(120000, Math.max(4000, item.file.size / 5000)); // Simulate by size
      const started = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - started;
        const pct = Math.min(99, Math.floor((elapsed / totalTime) * 100));
        setFiles((prev) => prev.map((f) => (f.id === item.id ? { ...f, progress: pct, status: "uploading" } : f)));
        if (elapsed >= totalTime) {
          clearInterval(timer);
          setFiles((prev) => prev.map((f) => (f.id === item.id ? { ...f, progress: 100, status: "done", url: URL.createObjectURL(item.file) } : f)));
          resolve("");
        }
      }, 120);
    });
  }, []);

  const startUpload = useCallback(async () => {
    const queued = files.filter((f) => f.status === "queued");
    if (queued.length === 0) {
      toast.info("No files queued.");
      return;
    }
    toast("Starting upload… Connect Supabase to enable cloud storage.");
    for (const file of queued) {
      // eslint-disable-next-line no-await-in-loop
      await simulateUpload(file);
    }
  }, [files, simulateUpload]);

  useEffect(() => {
    if (autoStart) {
      const hasQueued = files.some((f) => f.status === "queued");
      if (hasQueued) startUpload();
    }
  }, [files, autoStart, startUpload]);

  const total = useMemo(() => files.length, [files]);
  const completed = useMemo(() => files.filter((f) => f.status === "done").length, [files]);

  const removeItem = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearAll = useCallback(() => setFiles([]), []);

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-heading tracking-tight">Admin Uploads</h1>
        <p className="text-muted-foreground mt-1">Drag and drop files to upload. Large files supported once Supabase is connected.</p>
      </header>

      <section aria-label="Upload Uploader" className="grid gap-6 md:grid-cols-5">
        <article className="md:col-span-3">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-heading">Upload files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label
                ref={dropRef}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                htmlFor="file-input"
                className={`flex flex-col items-center justify-center gap-2 rounded-md border border-dashed p-8 text-center transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring ${isDragging ? "bg-primary/5 border-primary" : "bg-background/50"}`}
              >
                <div className="text-sm">Drop files here or click to browse</div>
                <div className="text-xs text-muted-foreground">Images, videos, documents. Multiple files supported.</div>
                <Input
                  id="file-input"
                  ref={inputRef}
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={(e) => onFilesAdded(e.target.files)}
                />
              </label>

              <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-muted-foreground">Queued: {total} · Completed: {completed}</div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" onClick={() => setAutoStart((v) => !v)} aria-pressed={autoStart}>
                    {autoStart ? "Auto-start: On" : "Auto-start: Off"}
                  </Button>
                  <Button onClick={startUpload}>Start upload</Button>
                  <Button variant="outline" onClick={clearAll}>Clear</Button>
                </div>
              </div>

              <Separator />

              <ul className="space-y-3">
                {files.map((item) => (
                  <li key={item.id} className="rounded-md border border-border p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium">{item.file.name}</p>
                        <p className="text-xs text-muted-foreground">{bytesToSize(item.file.size)} · {item.file.type || "unknown"}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.url ? (
                          <a href={item.url} target="_blank" rel="noreferrer" className="text-sm underline">Preview</a>
                        ) : null}
                        <Button size="sm" variant="ghost" onClick={() => removeItem(item.id)}>Remove</Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={item.progress} />
                      <div className="mt-1 text-xs text-muted-foreground capitalize">{item.status} · {item.progress}%</div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </article>

        <aside className="md:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-heading">How it works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                This uploader is fully responsive for mobile, tablet, and desktop. It currently simulates upload locally. To store files (including multi‑GB) connect Supabase and we’ll switch to resumable uploads automatically.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Drag & drop or click to select multiple files</li>
                <li>Progress per file with auto‑start option</li>
                <li>Preview generated for images/videos (temporary)</li>
              </ul>
              <Separator />
              <div>
                <p className="mb-2 text-foreground">Enable cloud storage</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Click the green Supabase button (top right) and connect your project.</li>
                  <li>Create a Storage bucket (e.g., “uploads”) in Supabase Dashboard.</li>
                  <li>Tell me the bucket name and access (public/private), I’ll wire it up.</li>
                </ol>
                <div className="mt-2">
                  <a className="underline" href="https://docs.lovable.dev/integrations/supabase/" target="_blank" rel="noreferrer">Supabase integration docs</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  );
};

export default Uploads;
