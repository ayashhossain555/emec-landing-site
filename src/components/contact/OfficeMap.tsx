import { site } from "@/content/site";
import styles from "./OfficeMap.module.css";

const { lat, lng } = site.geo;
const point = `${lat},${lng}`;

/** Google Maps links for the office, shared with the JSON-LD (`hasMap`). */
export const mapLinks = {
  embed: `https://maps.google.com/maps?q=${point}&z=17&hl=en&output=embed`,
  open: `https://www.google.com/maps/search/?api=1&query=${point}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${point}`,
};

/** Embedded Google Map (no API key needed) pinned at the office, plus directions links. */
export function OfficeMap() {
  return (
    <figure className={styles.map}>
      <iframe
        src={mapLinks.embed}
        title={`Map showing the ${site.name} office in ${site.addressShort}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <figcaption className={styles.links}>
        <a href={mapLinks.directions} target="_blank" rel="noopener noreferrer" className="link-arrow">Get directions →</a>
        <a href={mapLinks.open} target="_blank" rel="noopener noreferrer" className="link-arrow">Open in Google Maps →</a>
      </figcaption>
    </figure>
  );
}
