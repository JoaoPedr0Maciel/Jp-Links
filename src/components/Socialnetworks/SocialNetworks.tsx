import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export const SocialNetworks = () => {
  const icons = [
    {
      icon: (
        <FaInstagram className="transition duration-300 hover:text-pink-600" />
      ),
      link: "https://www.instagram.com/j.pedr0zzx/",
    },
    {
      icon: (
        <FaLinkedin className="transition duration-300 hover:text-[#0A66C2]" />
      ),
      link: "https://www.linkedin.com/in/jo%C3%A3o-pedro-maciel/",
    },
    {
      icon: (
        <FaGithub className="transition duration-300 hover:text-[#324057]" />
      ),
      link: "https://github.com/JoaoPedr0Maciel",
    },
  ];

  return (
    <div className="flex gap-3">
      {icons.map((icon) => (
        <a
          key={icon.link}
          href={icon.link}
          target="_blank"
          className="text-white text-3xl "
        >
          {icon.icon}
        </a>
      ))}
    </div>
  );
};
