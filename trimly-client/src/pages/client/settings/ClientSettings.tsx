import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material"
import {
  Notifications as NotificationsIcon,
  ChevronRight,
  HelpOutline,
  LockOutlined,
  Logout,
  ContentCut,
  Settings,
  DeleteOutline,
  Person,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import ConfirmationModal from "@/components/modals/ConfirmationModal"
import { useDispatch } from "react-redux"
import { useLogout } from "@/hooks/auth/useLogout"
import { logoutClient } from "@/services/auth/authService"
import { useToaster } from "@/hooks/ui/useToaster"
import { clientLogout } from "@/store/slices/client.slice"

export function ClientSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [appNotifications, setAppNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [confirmLogout, setConfirmLogout] = useState(false);

	const dispatch = useDispatch()
	const { mutate: logoutReq } = useLogout(logoutClient);
	const {successToast, errorToast} = useToaster()

	const handleLogout = () => {
		logoutReq(undefined, {
			onSuccess: (data) => {
				navigate("/");
				setConfirmLogout(false)
				dispatch(clientLogout());
				successToast(data.message);
			},
			onError: (err: any) => {
				errorToast(err.response.data.message);
			},
		});
	};

  const navigate = useNavigate()

  return (
    <Container maxWidth="md" sx={{ py: 5, mt: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Settings
        </Typography>
        <Typography color="text.secondary">Manage your account settings and preferences.</Typography>
      </Box>

      <Stack spacing={3}>
        {/* Profile Settings */}
        <Card elevation={1}>
          <CardHeader
            avatar={<Person />}
            title={<Typography variant="h6">Profile</Typography>}
            subheader="Manage your profile information"
          />
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="subtitle1" fontWeight="medium">
                  Personal Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Update your name, email, and profile picture
                </Typography>
              </Box>
              <IconButton>
                <ChevronRight />
              </IconButton>
            </Box>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card elevation={1}>
          <CardHeader
            avatar={<LockOutlined />}
            title={<Typography variant="h6">Security</Typography>}
            subheader="Manage your account security"
          />
          <CardContent>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Change Password
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Update your password
                  </Typography>
                </Box>
                <IconButton onClick={()=>navigate("/settings/change-password")}>
                  <ChevronRight />
                </IconButton>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card elevation={1}>
          <CardHeader
            avatar={<NotificationsIcon />}
            title={<Typography variant="h6">Notifications</Typography>}
            subheader="Manage how you receive notifications"
          />
          <CardContent>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Email Notifications
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Receive appointment reminders via email
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
                  }
                  label=""
                  labelPlacement="start"
                />
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    App Notifications
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Receive in-app notifications
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch checked={appNotifications} onChange={(e) => setAppNotifications(e.target.checked)} />
                  }
                  label=""
                  labelPlacement="start"
                />
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Marketing Emails
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Receive special offers and promotions
                  </Typography>
                </Box>
                <FormControlLabel
                  control={<Switch checked={marketingEmails} onChange={(e) => setMarketingEmails(e.target.checked)} />}
                  label=""
                  labelPlacement="start"
                />
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Barber Shop Preferences */}
        <Card elevation={1}>
          <CardHeader
            avatar={<ContentCut />}
            title={<Typography variant="h6">Barber Shop Preferences</Typography>}
            subheader="Customize your barber shop experience"
          />
          <CardContent>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Preferred Barbers
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Manage your favorite barbers
                  </Typography>
                </Box>
                <IconButton>
                  <ChevronRight />
                </IconButton>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Service History
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    View your past appointments
                  </Typography>
                </Box>
                <IconButton>
                  <ChevronRight />
                </IconButton>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Help and Support */}
        <Card elevation={1}>
          <CardHeader
            avatar={<HelpOutline />}
            title={<Typography variant="h6">Help and Support</Typography>}
            subheader="Get help with using the app"
          />
          <CardContent>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    FAQ
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Frequently asked questions
                  </Typography>
                </Box>
                <IconButton>
                  <ChevronRight />
                </IconButton>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Contact Support
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Get help from our support team
                  </Typography>
                </Box>
                <IconButton>
                  <ChevronRight />
                </IconButton>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    About
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Learn more about our app
                  </Typography>
                </Box>
                <IconButton>
                  <ChevronRight />
                </IconButton>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card elevation={1} sx={{ borderColor: "error.light", borderWidth: 1, borderStyle: "solid" }}>
          <CardHeader
            avatar={<Settings color="error" />}
            title={<Typography variant="h6">Account Actions</Typography>}
            subheader="Manage your account"
          />
          <CardContent>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Logout
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sign out of your account
                  </Typography>
                </Box>
                <Button variant="outlined" startIcon={<Logout />} size="small">
                  Logout
                </Button>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium" color="error">
                    Delete Account
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Permanently delete your account and all data
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteOutline />}
                  size="small"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  Delete
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

			<ConfirmationModal
				isOpen={confirmDelete}
				onClose={() => setConfirmDelete(false)}
				onConfirm={() => setConfirmDelete(false)}
				title="Are you sure you want to delete your account?"
				description="This action cannot be undone. Your account and data will be permanently deleted."
				confirmText="Delete"
				cancelText="Cancel"
				icon="danger"
			/>

			<ConfirmationModal
				isOpen={confirmLogout}
				onClose={() => setConfirmLogout(false)}
				onConfirm={handleLogout}
				title="Are you sure you want to logout?"
				description="You will be logged out of your account."
				confirmText="Logout"
				cancelText="Cancel"
				icon="logout"
			/>
    </Container>
  )
}

