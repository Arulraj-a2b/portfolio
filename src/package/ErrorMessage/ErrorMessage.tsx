import Text from "../Text/Text";

const ErrorMessage = ({
  name,
  errors,
  touched,
}: {
  name: any;
  errors: any;
  touched: any;
}) => {
  if (errors && typeof errors[name] === "string" && touched[name]) {
    return (
      <div style={{ marginTop: 4 }}>
        <Text color="error" size={12}>
          {errors[name]}
        </Text>
      </div>
    );
  }
  return null;
};
export default ErrorMessage;
