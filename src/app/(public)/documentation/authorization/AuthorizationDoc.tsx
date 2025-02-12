import Typography from '@mui/material/Typography';
import FuseHighlight from '@fuse/core/FuseHighlight';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import FuseNavigation from '@fuse/core/FuseNavigation';
import AdminRoleExampleConfigRaw from '@/app/(control-panel)/auth/admin-role-example/AdminRoleExampleRoute.tsx?raw';
import authProtectedNavigationExamplesRaw from './authProtectedNavigationExamples.ts?raw';
import authProtectedNavigationExamples from '@/app/(public)/documentation/authorization/authProtectedNavigationExamples';

function AuthorizationDoc() {
	return (
		<>
			<Typography
				variant="h3"
				className="mb-40 font-700"
			>
				Authorization in Fuse React
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				Fuse React employs the <code>FuseAuthorization</code> provider to handle route-level authorization,
				taking into account user roles and the defined route authentication.
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				Before route component is rendered, FuseAuthorization checks if the user is authenticated and has the
				required roles to access the route. If the user is not authenticated, they are redirected to the login
				page. If the user is authenticated but does not have the required roles, they are redirected to the not
				authorized page (401).
			</Typography>

			<Typography
				variant="h5"
				className="mt-32 mb-8 font-700"
			>
				Implementing Authorization
			</Typography>

			<Typography
				variant="h6"
				className="mt-20 mb-8 font-700"
			>
				Handling User roles
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				You can use the <code>useUser()</code> hook and from <code>FuseAuthContext/FuseAuthProvider</code> to
				access user data and roles.
			</Typography>

			<Typography
				variant="subtitle2"
				className="mb-16"
			>
				useUser() hook:
			</Typography>
			<FuseHighlight
				component="pre"
				className="language-jsx mb-24"
			>
				{`
import useUser from '@auth/useUser';

function MyComponent() {
  const { data: user, isGuest } = useUser();
				`}
			</FuseHighlight>
			<Typography
				variant="subtitle2"
				className="mb-16"
			>
				FuseAuthProvider:
			</Typography>
			<FuseHighlight
				component="pre"
				className="language-jsx mb-24"
			>
				{`
	<FuseAuthProvider providers={authProviders}>
			{(authState) => {
				const userRole = authState?.user?.role as User['role'];
				return <FuseAuthorization userRole={userRole}>{children}</FuseAuthorization>;
			}}
		</FuseAuthProvider>
				`}
			</FuseHighlight>

			<Typography
				variant="h6"
				className="mt-32 mb-8 font-700"
			>
				Authorization in components:
			</Typography>

			<ol className="list-decimal list-inside mb-16 p-0">
				<li>
					Use the <code>useUser</code> hook to access user data and roles
				</li>
				<li>Check the user's roles to determine access to certain features or components</li>
				<li>
					Use the <code>isGuest</code> flag to differentiate between authenticated and unauthenticated users
				</li>
			</ol>

			<Typography
				className="mb-16"
				variant="subtitle2"
			>
				Example usage:
			</Typography>

			<FuseHighlight
				component="pre"
				className="language-jsx mb-24"
			>
				{`
import useUser from '@auth/useUser';

function ProtectedComponent() {
  const { data: user, isGuest } = useUser();

  if (isGuest) {
    return <p>Please sign in to access this content.</p>;
  }

  if (!user.role.includes('admin')) {
    return <p>You don't have permission to view this content.</p>;
  }

  return <p>Welcome, Admin! Here's your protected content.</p>;
}
				`}
			</FuseHighlight>

			<Typography
				variant="h6"
				className="mt-32 mb-8 font-700"
			>
				Route-level Authorization
			</Typography>

			<Typography
				className="text-15 mt-16 mb-10 font-700"
				variant="h6"
			>
				Route Configuration:
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				You need to define authorization (auth) in the <b>route config files</b> to control the access via
				permission roles.
			</Typography>

			<Typography
				className="mt-32 mb-8"
				variant="subtitle2"
			>
				Example Usage:
			</Typography>

			<Typography
				className="inline-block mb-8 italic"
				component="code"
			>
				@/app/(control-panel)/auth/admin-role-example/AdminRoleExampleConfig.tsx
			</Typography>

			<FuseHighlight
				component="pre"
				className="language-jsx"
			>
				{AdminRoleExampleConfigRaw}
			</FuseHighlight>

			<Typography
				className="my-16"
				component="p"
			>
				You can also give different auth values for individual routes with writing auth value inside the route
				object.
			</Typography>

			<Paper className="max-w-md my-16 px-16">
				<Table className="m-0">
					<TableHead>
						<TableRow>
							<TableCell className="font-semibold text-base">Authorization Role (auth) options</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>
								<code>null</code>
							</TableCell>
							<TableCell>Do not check, allow everyone</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<code>[]</code>
							</TableCell>
							<TableCell>Only guest allowed</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<code>[admin,user]</code>
							</TableCell>
							<TableCell>Only 'admin' and 'user' roles are allowed</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Paper>
			<Typography
				variant="h6"
				className="mt-32 mb-8 font-700"
			>
				Navigation Item Configuration:
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				You can control the navigation <b>item/group/collapse</b> visibility by adding <b>auth</b>
				property in <code>src/configs/NavigationConfig.tsx</code>.
			</Typography>

			<Typography
				className="mt-32 mb-8"
				variant="subtitle2"
			>
				Example Usage:
			</Typography>

			<div className="flex lg:grid-cols-2 gap-12">
				<div className="flex flex-1">
					<FuseNavigation navigation={authProtectedNavigationExamples} />
				</div>
				<div className="flex flex-1 ">
					<FuseHighlight
						component="pre"
						className="language-js mb-32 max-h-sm overflow-y-auto"
					>
						{authProtectedNavigationExamplesRaw}
					</FuseHighlight>
				</div>
			</div>

			<Typography
				variant="h6"
				className="mt-32 mb-8 font-700"
			>
				Default Auth value:
			</Typography>

			<Typography component="p">
				If you don't want to set auth on every page config;
				<br />
				you can give defaultAuth role value in the file <code>src/configs/settingsConfig.tsx</code>
				<br />
				<br />
				The individual route configs which has auth option won't be overridden.
			</Typography>

			<Typography
				className="mt-24 mb-4"
				variant="h6"
			>
				Making the whole app auth protected by default:
			</Typography>

			<Typography
				className="mb-12"
				variant="subtitle2"
			>
				src/configs/settingsConfig.tsx
			</Typography>

			<FuseHighlight
				component="pre"
				className="language-js mb-32"
			>
				{`
					defaultAuth:['admin','staff','user']
				`}
			</FuseHighlight>

			<Typography
				className="mt-24 mb-4"
				variant="h6"
			>
				Making the whole app without authorization by default
			</Typography>

			<Typography
				className="mb-12"
				variant="subtitle2"
			>
				src/src/configs/settingsConfig.tsx
			</Typography>

			<FuseHighlight
				component="pre"
				className="language-js mb-32"
			>
				{`
				defaultAuth: null
				`}
			</FuseHighlight>
			<Typography
				variant="h5"
				className="mt-32 mb-8 font-700"
			>
				Best Practices
			</Typography>

			<ul className="list-disc list-inside mb-16 px-0">
				<li>
					Always use the <code>useUser</code> hook to access user data and perform authorization checks
				</li>
				<li>
					Implement role-based access control by checking user roles before rendering sensitive components or
					performing protected actions
				</li>
				<li>
					Use the <code>isGuest</code> flag to differentiate between authenticated and unauthenticated users
				</li>
				<li>
					Keep your authorization logic centralized and reusable to maintain consistency across your
					application
				</li>
			</ul>

			<Alert severity="warning">
				Remember to always combine client-side authorization checks with server-side validation to ensure the
				security of your application.
			</Alert>
		</>
	);
}

export default AuthorizationDoc;
