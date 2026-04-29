import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { themes, plugins } from "../utils/mockData";
import { Palette, Puzzle, RefreshCw } from "lucide-react";

export function ThemesPlugins() {
  const getThemeStatusColor = (status: string) => {
    switch (status) {
      case 'updated':
        return 'bg-green-500/10 text-green-700 hover:bg-green-500/20';
      case 'outdated':
        return 'bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20';
      case 'deprecated':
        return 'bg-red-500/10 text-red-700 hover:bg-red-500/20';
      default:
        return '';
    }
  };

  const getPluginStatusColor = (status: string) => {
    switch (status) {
      case 'updated':
        return 'bg-green-500/10 text-green-700 hover:bg-green-500/20';
      case 'update-available':
        return 'bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20';
      case 'critical':
        return 'bg-red-500/10 text-red-700 hover:bg-red-500/20';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Themes & Plugins Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="themes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="themes" className="gap-2">
              <Palette className="h-4 w-4" />
              Themes
            </TabsTrigger>
            <TabsTrigger value="plugins" className="gap-2">
              <Puzzle className="h-4 w-4" />
              Plugins
            </TabsTrigger>
          </TabsList>

          <TabsContent value="themes" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Theme Name</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Sites Using</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {themes.map((theme) => (
                    <TableRow key={theme.name}>
                      <TableCell>{theme.name}</TableCell>
                      <TableCell>{theme.version}</TableCell>
                      <TableCell>{theme.sitesUsing} sites</TableCell>
                      <TableCell>{theme.lastUpdate}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getThemeStatusColor(theme.status)}>
                          {theme.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="plugins" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plugin Name</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Sites Using</TableHead>
                    <TableHead>Pending Updates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plugins.map((plugin) => (
                    <TableRow key={plugin.name}>
                      <TableCell>{plugin.name}</TableCell>
                      <TableCell>{plugin.version}</TableCell>
                      <TableCell>{plugin.sitesUsing} sites</TableCell>
                      <TableCell>
                        {plugin.updates > 0 ? (
                          <Badge variant="outline" className="bg-orange-500/10 text-orange-700">
                            {plugin.updates} update{plugin.updates > 1 ? 's' : ''}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getPluginStatusColor(plugin.status)}>
                          {plugin.status.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
