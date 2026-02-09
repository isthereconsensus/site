import { PlasmicCanvasHost } from "@plasmicapp/react-web/lib/host";
import "../plasmic/registerCodeComponents";

// Do NOT wrap this with Layout / Navigation / etc.
// Plasmic explicitly warns extra elements will show up in the editor canvas. :contentReference[oaicite:4]{index=4}
export default function PlasmicHostPage() {
  return <PlasmicCanvasHost />;
}

