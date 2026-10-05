import Image from "next/image";
import s from "./ImageSlot.module.css";

export interface ImageSlotProps {
  /** Stable id — also the suggested filename: /public/images/<id>.jpg */
  id: string;
  /** Art-direction note shown while the slot is empty */
  placeholder: string;
  /** Image path (e.g. "/images/hero-surface.jpg"). Omit to show the placeholder. */
  src?: string;
  alt?: string;
  /** Load eagerly (above-the-fold hero) */
  priority?: boolean;
  sizes?: string;
  /** Keep the subject visible when the container crops the image. */
  objectPosition?: string;
}

/**
 * Photo slot that fills its positioned parent. Empty slots render a tinted placeholder carrying the
 * art-direction note, so layouts stay intact until real photography is supplied.
 */
export function ImageSlot({ id, placeholder, src, alt, priority, sizes = "100vw", objectPosition = "50% 50%" }: ImageSlotProps) {
  if (!src) {
    return (
      <div className={`${s.slot} ${s.empty}`} data-image-slot={id} role="img" aria-label={placeholder}>
        <span className={s.caption}>{placeholder}</span>
      </div>
    );
  }
  return (
    <div className={s.slot} data-image-slot={id}>
      <Image src={src} alt={alt ?? placeholder} fill sizes={sizes} preload={priority} className={s.img} style={{ objectPosition }} />
    </div>
  );
}
