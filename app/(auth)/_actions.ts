"use server";

import { EndPoints } from "@/lib/routes/EndPoints";
import axios from "axios";
import { loginSchemaType } from "./_component/lib";

export async function loginAction(data: loginSchemaType) {
  try {
    const res = await axios.post(EndPoints.login, { ...data });
    if (res.status === 200) {
      const permissions = res.data.permissions as Record<string, boolean>;

      // Filter the permissions that are true and start with "بینینەوەی"
      const filteredPermissions = Object.keys(permissions).filter(
        (key) => permissions[key] && key.startsWith("بینینەوەی")
      );

      // Translate the permissions to the correct route
      const categoryTranslation = {
        "بینینەوەی بەکارهێنەر": "setting/users",
        "بینینەوەی ئەرک": "setting/roles",
      };

      // Translate the permissions
      const permissionsTranslation = filteredPermissions.map(
        (perm) => categoryTranslation[perm as keyof typeof categoryTranslation]
      );

      // Get the first permission
      const userFirstPermission = filteredPermissions[0];
      // Determine the redirect route
      // const redirect =
      //   categoryTranslation[
      //     userFirstPermission as keyof typeof categoryTranslation
      //   ];
      const redirect = "main";
      // Create the token with permissions
      const token =
        res.data?.token.trim() +
        ",between," +
        JSON.stringify(permissionsTranslation);

      return {
        success: true,
        message: "بە سەرکەوتوویی چوویتەژوورەوە",
        data: {
          token,
          redirect,
        },
      };
    }
  } catch (error: any) {
    const message = error?.response?.data[Object.keys(error.response.data)[0]];
    return {
      success: false,
      message,
    };
  }
}

export type loginType = {
  token: string;
  permissions: {
    "نوێکردنەوەی زانیاریەکان": boolean;
    "زیادکردنی بەکارهێنەر": boolean;
    "سڕینەوەی بەکارهێنەر": boolean;
    "نوێکردنەوەی زانیاریەکانی بەکارهێنەر": boolean;
    "بینینەوەی بەکارهێنەر": boolean;
    "زیادکردنی ئەرک": boolean;
    "سڕینەوەی ئەرک": boolean;
    "نوێکردنەوەی ئەرک": boolean;
    "بینینەوەی ئەرک": boolean;
    "زیادکردنی پلان": boolean;
    "نوێکردنەوەی پلان": boolean;
    "بینینەوەی پلان": boolean;
    "زیادکردنی فیلم": boolean;
    "نوێکردنەوەی فیلم": boolean;
    "بینینەوەی فیلم": boolean;
    "سڕینەوەی فیلم": boolean;
    "زیادکردنی زنجیرە": boolean;
    "نوێکردنەوەی زنجیرە": boolean;
    "سڕینەوەی زنجیرە": boolean;
    "زیادکردنی وەرز": boolean;
    "بینینەوەی زنجیرە": boolean;
    "زیادکردنی ئەلقە": boolean;
    "نوێکردنەوەی ئەلقە": boolean;
    "زیادکردنی کۆدی ئەکتیڤ کردن": boolean;
    "بینینەوەی کۆدی ئەکتیڤ کردن": boolean;
    "زیادکردنی سڵایدەر": boolean;
    "سڕینەوەی سڵایدەر": boolean;
    "بینینەوەی کڕیار": boolean;
    "بلۆک کردنی کڕیار": boolean;
    "سڕینەوەی کۆدی ئەکتیڤ کردن": boolean;
    "زیادکردنی ڕیکلام": boolean;
    "سڕینەوەی ڕیکلام": boolean;
  };
};
