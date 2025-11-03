import axios from "axios";
import domtoimage from "dom-to-image-more";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { server } from "../constants/config";

const GetPass = ({ userEmail }) => {
  const [passData, setPassData] = useState(null);
  const [error, setError] = useState("");
  const passRef = useRef(null);

  useEffect(() => {
    const fetchPass = async () => {
      try {
        const res = await axios.get(`${server}/getpass?email=${userEmail}`);
        setPassData(res.data);
      } catch (err) {
        console.error("Error fetching pass:", err);
        setError("You are not eligible for the event pass yet!");
      }
    };
    if (userEmail) fetchPass();
  }, [userEmail]);

  const handleDownloadPDF = async () => {
    try {
      const node = passRef.current;
      // const dataUrl = await domtoimage.toJpeg(node, { quality: 0.6 }); // 60% quality JPEG
      const dataUrl = await domtoimage.toJpeg(node, { quality: 0.6, style: { transform: "scale(0.8)", transformOrigin: "top left" } });


      const pdf = new jsPDF("portrait", "pt", "a4");

      const imgWidth = 500;
      const imgHeight = (pdf.internal.pageSize.getHeight() * imgWidth) / pdf.internal.pageSize.getWidth();
      const x = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
      const y = 80;

      pdf.text("🎟 Workshop Entry Pass", 170, 50);
      pdf.addImage(dataUrl, "PNG", x, y, imgWidth, imgHeight);
      pdf.save(`Entry_Pass_${passData?.name || "Candidate"}.pdf`);
    } catch (err) {
      console.error("Failed to generate pass:", err);
      alert("Failed to generate your pass: " + err.message);
    }
  };

  if (error) return <h2>{error}</h2>;
  if (!passData) return <p>Loading pass...</p>;

  const shareUrl = `https://youreventsite.com/pass/${passData._id}`;
  const shareTitle = `🎟 I just got my entry pass for ${passData.eventName || "the Workshop 2025"}!`;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 min-h-screen">

      <h1 className="font-bold text-2xl">  Your Certificate is Ready! </h1>
      <h2 className=" text-xl">  ✅ Congratulations! You’ve successfully completed the quiz. </h2>
      <div
        ref={passRef}
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md text-center border"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          {passData.eventName || "Workshop 2025"}
        </h2>
        <p className="font-semibold text-gray-800">Name: {passData.name}</p>
        <p className="text-gray-600">Email: {passData.email}</p>
        <p className="text-gray-600">Venue: {passData.venue}</p>
        <p className="font-semibold">✅ Approved</p>
        <div className="mt-4 flex justify-center">
          <QRCodeCanvas value={passData.email} size={100} />
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Pass ID: {passData._id.slice(-6).toUpperCase()}
        </p>
      </div>

      <button
        onClick={handleDownloadPDF}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        ⬇️ Download your Certificate (PDF)
      </button>

      <div className="mt-6 text-center">
        <p className="text-black-700 mb-2 font-bold text-2xl">  Share Your Achievement </p>
        <p className="text-xl font-semibold"> ➤  share your achievement with hashtags: <br />  #upDateEducation #WorkshopSuccess #SkillBuilding </p>
        <p className="font-bold p-4 text-xl">Share on:</p>
        <div className="flex justify-center gap-3">
          <FacebookShareButton url={shareUrl} quote={shareTitle}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={shareTitle}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <WhatsappShareButton url={shareUrl} title={shareTitle}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>

          <LinkedinShareButton url={shareUrl} title={shareTitle}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
        </div>
      </div>
    </div>
  );
};

export default GetPass;
