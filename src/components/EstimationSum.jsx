import React, { useEffect } from "react";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";

const EstimateSummary = ({ selectedFeatures, hourlyRate }) => {
  const navigate = useNavigate();

  // Calculated values
  const totalFeatures = selectedFeatures.length;
  const totalHours = selectedFeatures.reduce((sum, f) => sum + f.hours, 0);
  const totalPrice = totalHours * hourlyRate;
  const totalDays = Math.ceil(totalHours / 8);

  const summaryText = `
Project Estimate
================
Total Features: ${totalFeatures}
Estimated Hours: ${totalHours} hours
Timeline: ${totalDays} days
Hourly Rate: $${hourlyRate}
Total Price: $${totalPrice}

Selected Features:
${selectedFeatures.map(f => `- ${f.title} (${f.hours} hrs, $${f.price})`).join("\n")}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText)
      .then(() => alert("Estimate copied to clipboard!"))
      .catch(err => console.error("Failed to copy", err));
  };

  const saveEstimateToBackend = async (estimateData) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      alert("User not logged in!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, estimate: estimateData }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Failed to save estimate:", data.message);
        alert(`Failed to save estimate: ${data.message}`);
      } else {
        console.log("Estimate saved:", data);
      }
    } catch (error) {
      console.error("Error saving estimate:", error);
      alert("Failed to save estimate. Please try again.");
    }
  };

  const handleDownloadPDF = async () => {
    const estimate = {
      totalFeatures,
      estimatedHours: `${totalHours} hours`,
      timeline: `${totalDays} days`,
      cost: totalPrice,
      featuresSelected: selectedFeatures.map(f => f.title),
    };

    await saveEstimateToBackend(estimate);

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Project Estimate", 20, 20);
    doc.setFontSize(12);
    doc.text(`Total Features: ${estimate.totalFeatures}`, 20, 40);
    doc.text(`Estimated Hours: ${estimate.estimatedHours}`, 20, 50);
    doc.text(`Timeline: ${estimate.timeline}`, 20, 60);
    doc.text(`Cost: $${estimate.cost}`, 20, 70);
    doc.text(`Features Selected: ${estimate.featuresSelected.join(" \n ")}`, 20, 80);

    doc.save("estimate.pdf");
    alert("Estimate saved and PDF downloaded successfully!");
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent("Project Estimate");
    const body = encodeURIComponent(summaryText);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  // Save estimate automatically when features change
  useEffect(() => {
    if (selectedFeatures.length === 0) return;

    const estimate = {
      totalFeatures,
      estimatedHours: `${totalHours} hours`,
      timeline: `${totalDays} days`,
      cost: totalPrice,
     featuresSelected: selectedFeatures.map(f => f.title).join("\n"),
    };

    saveEstimateToBackend(estimate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFeatures]); // Only run when selectedFeatures changes

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Estimate</h2>

      <ul className="space-y-3 mb-6">
        <li className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
          <span>Total Features</span>
          <span className="font-semibold text-gray-800">{totalFeatures}</span>
        </li>
        <li className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
          <span>Estimated Hours</span>
          <span className="font-semibold text-gray-800">{totalHours} hours</span>
        </li>
        <li className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
          <span>Timeline</span>
          <span className="font-semibold text-gray-800">{totalDays} days</span>
        </li>
      </ul>

      <div className="text-center text-3xl font-bold text-indigo-600 mb-6">
        ${totalPrice}
      </div>

      <div className="space-y-3">
        <button
          onClick={handleCopy}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
        >
          Copy to Clipboard
        </button>
        <button onClick={handleDownloadPDF} className="w-full border bg-gray-600 text-white px-4 py-2 rounded-lg">
          Download PDF
        </button>

        <button
          onClick={handleSendEmail}
          className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-lg transition"
        >
          Send to Client
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      <div className="mt-8 text-xs text-gray-500 whitespace-pre-line">
        <strong className="block text-gray-700 mb-1">PROJECT SCOPE SUMMARY</strong>
        {selectedFeatures.length === 0 ? (
          <p className="italic">
            Select features to generate a detailed project scope summary...
          </p>
        ) : (
          <pre className="whitespace-pre-line">{summaryText}</pre>
        )}
      </div>
    </div>
  );
};

export default EstimateSummary;
