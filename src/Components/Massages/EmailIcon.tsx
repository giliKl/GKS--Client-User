import { FaPaperPlane } from "react-icons/fa";

const EmailIcon = () => {
  const handleEmailClick = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=gks.securing@gmail.com&su=Contact the GKS security Team`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <>
      <style>{`
        .email-icon {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #579FBA;
          color: white;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
          border: none;
        }

        .email-icon:hover {
          background-color: #3ec1c1;
          transform: scale(1.1);
        }

        .email-icon i {
          font-size: 18px;
          color: white;
        }
          .email-icon-arrow {          
            position: absolute;
            bottom: 30%;
            right: 30%;
            font-size: 30px;
            color: white;
            transition: transform 0.3s ease;
            z-index: 1000;
            }
      `}</style>

      <button className="email-icon" onClick={handleEmailClick}>
        <FaPaperPlane className="email-icon-arrow" />
       
      </button>
    </>
  );
};

export default EmailIcon;