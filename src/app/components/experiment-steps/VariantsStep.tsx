import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function VariantsStep() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Define Variants</h3>
        <p className="text-sm text-muted-foreground">
          Set up the control and test variants for your experiment
        </p>
      </div>

      {/* Control */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium">Control (Original)</h4>
            <p className="text-sm text-muted-foreground">Current live version</p>
          </div>
        </div>
        <div className="bg-white border-2 border-dashed rounded-lg p-8 text-center">
          <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-muted-foreground">Current Page Preview</p>
          </div>
        </div>
      </div>

      {/* Variant A */}
      <div className="border rounded-lg p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="variant-name">Variant Name</Label>
            <Input id="variant-name" placeholder="e.g., Variant A - Blue CTA" />
          </div>

          <div className="space-y-2">
            <Label>Change Type</Label>
            <Tabs defaultValue="copy">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="copy">Copy</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="color">Color</TabsTrigger>
                <TabsTrigger value="feature">Feature</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="copy" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="copy-before">Original Text</Label>
                  <Input
                    id="copy-before"
                    placeholder="Learn More"
                    className="bg-gray-50"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="copy-after">New Text</Label>
                  <Input id="copy-after" placeholder="Get Started Today" />
                </div>
              </TabsContent>
              <TabsContent value="layout" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Layout change options will appear here
                </p>
              </TabsContent>
              <TabsContent value="color" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Color picker options will appear here
                </p>
              </TabsContent>
              <TabsContent value="feature" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Feature toggle options will appear here
                </p>
              </TabsContent>
              <TabsContent value="code" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Custom code editor will appear here
                </p>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label>Visual Diff Preview</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-2">Control</p>
                <div className="bg-gray-100 rounded h-32 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-24 h-8 bg-gray-300 rounded mx-auto" />
                    <p className="text-xs">Learn More</p>
                  </div>
                </div>
              </div>
              <div className="border-2 border-dashed border-blue-500 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-2">Variant A</p>
                <div className="bg-blue-50 rounded h-32 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-32 h-8 bg-blue-500 rounded mx-auto" />
                    <p className="text-xs font-medium">Get Started Today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Another Variant
      </Button>
    </div>
  );
}
