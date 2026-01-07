import React, { useState } from "react";
import { toast } from "react-toastify";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.warning("Lütfen tüm alanları doldurun!");
      return;
    }

    try {
      await onCreate({ title, description });
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error("Görev eklenemedi!");
      console.error(error);
    }
  };

  return (
    <form onSubmit={submit} className="task-form">
    <input
      type="text"
      placeholder="Başlık"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="heading-input"
    />

    <textarea
      placeholder="Açıklama"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="description-input"
    />

    <button type="submit">Görev Ekle</button>
  </form>

  );
}
