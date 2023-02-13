import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

export default interface DrawerOptionTextIconsType {
	text: string;
	icon: OverridableComponent<SvgIconTypeMap> & { muiName: string }
}