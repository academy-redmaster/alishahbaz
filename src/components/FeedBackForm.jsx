import {
  AtSign,
  CheckCircle2,
  Loader2,
  MessageSquare,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";

const FeedBackForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.description.trim()) {
      errors.description = "Message is required";
    } else if (formData.description.length < 10) {
      errors.description = "Message must be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ username: "", email: "", description: "" });
    setTimeout(() => setIsSubmitted(false), 3000);
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="w-full md:w-2/3">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                <MessageSquare size={12} className="text-amber-600" />
                <span className="text-[11px] font-bold text-gray-900 uppercase tracking-[0.2em]">
                  Share Your Feedback
                </span>
              </div>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-200"
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Thank You! 🙌
                  </h3>
                  <p className="text-base text-gray-500 mt-2">
                    Your feedback has been received. I appreciate your time!
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className={`w-full pl-11 pr-4 py-3.5 text-base bg-white border ${
                          formErrors.username
                            ? "border-red-300"
                            : "border-gray-200"
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 transition-all`}
                        placeholder="Enter your username"
                      />
                    </div>
                    {formErrors.username && (
                      <p className="text-[11px] text-red-500 mt-1">
                        {formErrors.username}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <AtSign size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-11 pr-4 py-3.5 text-base bg-white border ${
                          formErrors.email
                            ? "border-red-300"
                            : "border-gray-200"
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 transition-all`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-[11px] text-red-500 mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                      Your Message
                    </label>
                    <div className="relative">
                      <div className="absolute top-3.5 left-3 pointer-events-none">
                        <MessageSquare size={18} className="text-gray-400" />
                      </div>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full pl-11 pr-4 py-3.5 text-base bg-white border ${
                          formErrors.description
                            ? "border-red-300"
                            : "border-gray-200"
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 transition-all resize-none`}
                        placeholder="Share your thoughts, ideas, or feedback..."
                      />
                    </div>
                    {formErrors.description && (
                      <p className="text-[11px] text-red-500 mt-1">
                        {formErrors.description}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-[#393D44] hover:bg-[#2D3138] disabled:bg-gray-400 text-white text-base font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Feedback
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedBackForm;
