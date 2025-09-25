import React, { useState } from "react";
import type { IEvent } from "../../@types/interface/event.interface";
import { eventValidationSchema } from "../../validations/event.validation";
import z from "zod";
import { toast } from "react-toastify";
import api from "../../config/axios.config";
import { AxiosError } from "axios";
import { FaSpinner } from "react-icons/fa";

function AddEventPage() {
  const [formData, setFormData] = React.useState<IEvent>({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    venue: "",
  });

  const [error, setError] = useState<
    | {
        title?: { errors: string[] };
        description?: { errors: string[] };
        start_date?: { errors: string[] };
        end_date?: { errors: string[] };
        start_time?: { errors: string[] };
        end_time?: { errors: string[] };
        venue?: { errors: string[] };
      }
    | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      venue: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setLoading(true);
    try {
      const validateData = eventValidationSchema
        .omit({ event_id: true, posted_by: true })
        .safeParse(formData);
      console.log("Validated data:", validateData);
      if (!validateData.success) {
        const errors = z.treeifyError(validateData.error).properties;
        console.log(errors);
        setError(errors);
        return;
      }

      console.log(validateData.data);
      const response = await api.post("/event", validateData.data);
      if (response.status === 201) {
        handleReset();
        toast("Event added successfully", { type: "success" });
      }
      console.log(response);
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || "Failed to add event", {
          type: "error",
        });
      } else {
        toast("Something went wrong", { type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full p-6 flex-col">
      <h1 className="main-heading font-bold text-xl mb-5">Add Event</h1>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="event_form flex flex-col w-full "
      >
        <h1 className="text-lg font-bold mt-2">Basic Details</h1>
        <div className="form_group flex gap-3 my-1 flex-col">
          <div className="form_field flex-row w-full gap-2 grid md:grid-cols-1 lg:grid-cols-3">
            <div className="form_field flex flex-col gap-2 grow">
              <label htmlFor="title">
                Title<span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                placeholder="Input event title"
                required
                value={formData.title}
                onChange={handleChange}
              />
              {error?.title && (
                <p className="text-red-500">* {error.title.errors[0]}</p>
              )}
            </div>

            <div className="form_field flex flex-col w-full gap-2">
              <label htmlFor="start_date">
                Start_date<span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Input start_date"
                required
                value={formData.start_date}
                onChange={handleChange}
              />
              {error?.start_date && (
                <p className="text-red-500">* {error.start_date.errors[0]}</p>
              )}
            </div>
            <div className="form_field flex flex-col w-full gap-2">
              <label htmlFor="end_date">
                End_date<span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Input end_date"
                required
                value={formData.end_date}
                onChange={handleChange}
                // min={formData.start_date}
              />
              {error?.end_date && (
                <p className="text-red-500">* {error.end_date.errors[0]}</p>
              )}
            </div>
          </div>

          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="description">
              Description<span className="text-red-500 font-bold">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 placeholder:absolute placeholder:top-2 placeholder:left-3 placeholder:text-gray-400 "
              placeholder="Input notice description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={10}
            />
            {error?.description && (
              <p className="text-red-500">* {error.description.errors[0]}</p>
            )}
          </div>

          <div className="form_field flex flex-col w-full gap-2">
            <div className="form_field flex-row w-full gap-2 grid md:grid-cols-1 lg:grid-cols-3">
              <div className="form_field flex flex-col gap-2  grow">
                <label htmlFor="start_time">
                  Start_time<span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="time"
                  id="start_time"
                  name="start_time"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Input start_time"
                  required
                  value={formData.start_time}
                  onChange={handleChange}
                />
                {error?.start_time && (
                  <p className="text-red-500">* {error.start_time.errors[0]}</p>
                )}
              </div>
              <div className="form_field flex flex-col w-full gap-2">
                <label htmlFor="end_time">End_time</label>
                <input
                  type="time"
                  id="end_time"
                  name="end_time"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Input end_time (Optional)"
                  value={formData.end_time}
                  onChange={handleChange}
                />
                {error?.end_time && (
                  <p className="text-red-500">* {error.end_time.errors[0]}</p>
                )}
              </div>
              <div className="form_field flex flex-col w-full gap-2">
                <label htmlFor="venue">
                  Venue<span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                  placeholder="Input event venue"
                  required
                  value={formData.venue}
                  onChange={handleChange}
                />
                {error?.venue && (
                  <p className="text-red-500">* {error.venue.errors[0]}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="button_group flex gap-3 my-5">
          <button
            type="submit"
            className="rounded-md bg-green-600 px-4 py-2 cursor-pointer text-white hover:bg-green-700"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin text-white" size={16} />
            ) : (
              "Submit"
            )}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="rounded-md bg-red-600 px-4 py-2 cursor-pointer text-white hover:bg-red-700"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEventPage;
