import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

function FeaturesSection() {
  return (
    <section className="mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12 justify-center w-[95%] rounded-lg bg-slate-800 border-2 border-slate-950">
      <Tabs defaultValue="feature-1" className="flex flex-col md:flex-row w-full gap-12">
        {/* Left: Title and Features */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">Simple tools. Powerful results.</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our app makes reflection easy with minimalist tools built to help you gain clarity, track growth, and find calm amidst chaos.
          </p>

          <TabsList className="grid w-full grid-cols-3 bg-slate-950 mb-6">
            <TabsTrigger value="feature-1">Tagging</TabsTrigger>
            <TabsTrigger value="feature-2">Clean UI</TabsTrigger>
            <TabsTrigger value="feature-3">Note History</TabsTrigger>
          </TabsList>

          <TabsContent value="feature-1">
            <h3 className="text-xl font-semibold">Organize with Tags</h3>
            <p className="text-muted-foreground">
              Easily categorize and search your thoughts using intuitive tags.
            </p>
          </TabsContent>

          <TabsContent value="feature-2">
            <h3 className="text-xl font-semibold">Clutter-Free Experience</h3>
            <p className="text-muted-foreground">
              Designed to be visually quiet, so you can focus on what matters most — you.
            </p>
          </TabsContent>

          <TabsContent value="feature-3">
            <h3 className="text-xl font-semibold">Automatic History</h3>
            <p className="text-muted-foreground">
              Your entries are versioned so you never lose important thoughts or edits.
            </p>
          </TabsContent>
        </div>

        {/* Right: Dynamic Image */}
        <div className="flex-1">
          <TabsContent value="feature-1">
            <Card className="overflow-hidden">
              <img
                src="/feature-tagging.png"
                alt="Tagging feature"
                className="w-full h-[375px] object-cover object-[60%] rounded-md shadow-lg"
              />
            </Card>
          </TabsContent>

          <TabsContent value="feature-2">
            <Card className="overflow-hidden">
              <img
                src="/feature-ui.png"
                alt="Clean UI"
                className="w-full h-[375px] object-cover rounded-md shadow-lg"
              />
            </Card>
          </TabsContent>

          <TabsContent value="feature-3">
            <Card className="overflow-hidden">
              <img
                src="/feature-history.png"
                alt="Note History"
                className="w-full h-[375px] object-cover object-top rounded-md shadow-lg"
              />
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}

export default FeaturesSection;