import React, { useState } from "react";
import {
  Tooltip,
  IconButton,
  styled,
  TooltipProps,
  ClickAwayListener,
  Fade,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#fff",
    color: "#333",
    boxShadow: theme.shadows[2],
    fontSize: 14,
    borderRadius: 10,
    padding: "10px 15px",
    maxWidth: 240,
    transition: "all 0.3s ease",
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#fff",
  },
}));

interface HelperIconProps {
  iconType: "?" | "!";
  text: string;
}

const HelperIcon: React.FC<HelperIconProps> = ({ iconType, text }) => {
  const [open, setOpen] = useState(false);

  const IconComponent = iconType === "!" ? ErrorOutlineIcon : HelpOutlineIcon;
  const iconColor = iconType === "!" ? "#e14a4acf" : "#1976d2";

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <StyledTooltip
          title={text}
          arrow
          placement="right"
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 500 }}
        >
          <IconButton onClick={handleToggle} sx={{ padding: 0 }} size="small">
            <IconComponent sx={{ fontSize: 20, color: iconColor }} />
          </IconButton>
        </StyledTooltip>
      </div>
    </ClickAwayListener>
  );
};

export default HelperIcon;

