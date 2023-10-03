import { cva, type VariantProps } from "cva";

const buttonStyles = cva(
  "rounded-lg px-4 py-2 text-xl font-medium border-transparent",
  {
    variants: {
      intent: {
        primary: ["bg-blue-500", "text-white", "hover:bg-blue-400"],
        success: ["bg-green-500", "text-white", "hover:bg-green-400"],
        danger: ["bg-red-500", "text-white", "hover:bg-red-400"],
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

const Button: React.FC<ButtonProps> = ({ className, intent, ...props }) => (
  <button className={buttonStyles({ intent, className })} {...props} />
);

export default Button;
