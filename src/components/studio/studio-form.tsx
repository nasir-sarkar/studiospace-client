"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ImagePlus, Plus, Save, X } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/components/providers/session-provider";
import { apiFetch } from "@/lib/api";
import { categoryValues, suggestedAmenities } from "@/lib/constants";
import { uploadToImgbb } from "@/lib/imgbb";
import type { IStudio, IStudioFormValues } from "@/lib/types/studio";
import { StudioImage } from "./studio-image";

export const emptyStudioForm: IStudioFormValues = {
  title: "",
  category: "",
  hourlyRate: "",
  securityDeposit: "",
  maxCapacity: "",
  location: "",
  imageUrl: "",
  gallery: "",
  amenities: [],
  overview: "",
};

export const studioToFormValues = (studio: IStudio): IStudioFormValues => ({
  title: studio.title,
  category: studio.category,
  hourlyRate: String(studio.hourlyRate),
  securityDeposit: String(studio.securityDeposit),
  maxCapacity: String(studio.maxCapacity),
  location: studio.location,
  imageUrl: studio.imageUrl,
  gallery: (studio.gallery || [])
    .filter((image) => image !== studio.imageUrl)
    .join("\n"),
  amenities: studio.amenities,
  overview: studio.overview,
});

interface StudioFormProps {
  mode: "add" | "edit";
  studioId?: string;
  initialValues?: IStudioFormValues;
}

export function StudioForm({ mode, studioId, initialValues = emptyStudioForm }: StudioFormProps) {
  const router = useRouter();
  const { user } = useSession();
  const [form, setForm] = useState<IStudioFormValues>(initialValues);
  const [customAmenity, setCustomAmenity] = useState("");
  const [uploading, setUploading] = useState<"cover" | "gallery" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const coverInput = useRef<HTMLInputElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);

  const update = <K extends keyof IStudioFormValues>(field: K, value: IStudioFormValues[K]) =>
    setForm((current) => ({ ...current, [field]: value }));

  const toggleAmenity = (amenity: string) =>
    update(
      "amenities",
      form.amenities.includes(amenity)
        ? form.amenities.filter((item) => item !== amenity)
        : [...form.amenities, amenity],
    );

  const addCustomAmenity = () => {
    const value = customAmenity.trim();
    if (!value) {
      return;
    }
    if (!form.amenities.includes(value)) {
      update("amenities", [...form.amenities, value]);
    }
    setCustomAmenity("");
  };

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    target: "cover" | "gallery",
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }

    setUploading(target);
    try {
      const url = await uploadToImgbb(file);
      if (target === "cover") {
        update("imageUrl", url);
      } else {
        update("gallery", form.gallery ? `${form.gallery}\n${url}` : url);
      }
      toast.success("Image uploaded successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.category) {
      toast.error("Please choose a studio category.");
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch(mode === "add" ? "/studios" : `/studios/${studioId}`, {
        method: mode === "add" ? "POST" : "PUT",
        body: JSON.stringify({
          ...form,
          hourlyRate: Number(form.hourlyRate),
          securityDeposit: Number(form.securityDeposit),
          maxCapacity: Number(form.maxCapacity),
          gallery: form.gallery
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
        }),
      });
      toast.success(
        mode === "add" ? "Studio listed successfully." : "Studio updated successfully.",
      );
      router.push("/my-listings");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save the studio.");
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Studio Title</Label>
        <Input
          id="title"
          className="h-10"
          placeholder="Northlight Cyclorama Studio"
          value={form.title}
          onChange={(event) => update("title", event.target.value)}
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label>Category</Label>
          <Select value={form.category} onValueChange={(value) => update("category", value ?? "")}>
            <SelectTrigger className="h-10 w-full" aria-label="Studio category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categoryValues.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location / Address</Label>
          <Input
            id="location"
            className="h-10"
            placeholder="Brooklyn, New York"
            value={form.location}
            onChange={(event) => update("location", event.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
          <Input
            id="hourlyRate"
            type="number"
            min="1"
            step="0.01"
            className="h-10"
            placeholder="65"
            value={form.hourlyRate}
            onChange={(event) => update("hourlyRate", event.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="securityDeposit">Security Deposit ($)</Label>
          <Input
            id="securityDeposit"
            type="number"
            min="0"
            step="0.01"
            className="h-10"
            placeholder="150"
            value={form.securityDeposit}
            onChange={(event) => update("securityDeposit", event.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="maxCapacity">Max Capacity</Label>
          <Input
            id="maxCapacity"
            type="number"
            min="1"
            className="h-10"
            placeholder="12"
            value={form.maxCapacity}
            onChange={(event) => update("maxCapacity", event.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="imageUrl">Cover Image URL</Label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            id="imageUrl"
            type="url"
            className="h-10"
            placeholder="https://i.ibb.co/your-image.jpg"
            value={form.imageUrl}
            onChange={(event) => update("imageUrl", event.target.value)}
            required
          />
          <input
            ref={coverInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => handleUpload(event, "cover")}
          />
          <Button
            type="button"
            variant="outline"
            disabled={uploading === "cover"}
            onClick={() => coverInput.current?.click()}
          >
            {uploading === "cover" ? <Spinner /> : <ImagePlus data-icon="inline-start" />}
            Upload Image
          </Button>
        </div>
        {form.imageUrl && (
          <div className="relative aspect-[16/7] w-full max-w-md overflow-hidden rounded-xl bg-muted">
            <StudioImage src={form.imageUrl} alt="Cover preview" sizes="448px" />
          </div>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="gallery">Extra Gallery Images (one URL per line, optional)</Label>
        <Textarea
          id="gallery"
          className="min-h-24"
          placeholder="https://i.ibb.co/second-photo.jpg"
          value={form.gallery}
          onChange={(event) => update("gallery", event.target.value)}
        />
        <input
          ref={galleryInput}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => handleUpload(event, "gallery")}
        />
        <Button
          type="button"
          variant="outline"
          className="w-fit"
          disabled={uploading === "gallery"}
          onClick={() => galleryInput.current?.click()}
        >
          {uploading === "gallery" ? <Spinner /> : <ImagePlus data-icon="inline-start" />}
          Upload Gallery Photo
        </Button>
      </div>

      <div className="grid gap-3">
        <Label>Amenities</Label>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {suggestedAmenities.map((amenity) => (
            <label
              key={amenity}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-3 py-2.5 text-sm"
            >
              <Checkbox
                checked={form.amenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              {amenity}
            </label>
          ))}
        </div>
        <div className="flex gap-3">
          <Input
            className="h-10"
            placeholder="Add a custom amenity"
            value={customAmenity}
            onChange={(event) => setCustomAmenity(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addCustomAmenity();
              }
            }}
          />
          <Button type="button" variant="outline" onClick={addCustomAmenity}>
            <Plus data-icon="inline-start" />
            Add
          </Button>
        </div>
        {form.amenities.filter((item) => !suggestedAmenities.includes(item)).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.amenities
              .filter((item) => !suggestedAmenities.includes(item))
              .map((item) => (
                <Badge key={item} variant="secondary" className="gap-1.5 py-3 pr-1.5">
                  {item}
                  <button
                    type="button"
                    aria-label={`Remove ${item}`}
                    onClick={() => toggleAmenity(item)}
                    className="rounded-full p-0.5 hover:bg-background"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
          </div>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="overview">Detailed Overview</Label>
        <Textarea
          id="overview"
          className="min-h-36"
          placeholder="Describe the space, the best use cases, access details and house rules."
          value={form.overview}
          onChange={(event) => update("overview", event.target.value)}
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="ownerName">Host Name</Label>
          <Input id="ownerName" className="h-10" value={user?.name ?? ""} readOnly />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="ownerEmail">Host Email</Label>
          <Input id="ownerEmail" className="h-10" value={user?.email ?? ""} readOnly />
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-6">
        <Button render={<Link href="/my-listings" />} nativeButton={false} variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? <Spinner /> : <Save data-icon="inline-start" />}
          {mode === "add" ? "Add Studio" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
